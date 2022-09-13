import {
    Avatar,
    Box,
    Container,
    Grid,
    Link,
    TextField,
    Typography,
} from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { Person as PersonIcon } from '@mui/icons-material'
import { FormEvent, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../app/hooks'
import { register } from '../features/auth/authSlice'
import { toast } from 'react-toastify'

interface Props {}
const Register = (props: Props) => {
    const username = useRef<HTMLInputElement>(null)
    const email = useRef<HTMLInputElement>(null)
    const password = useRef<HTMLInputElement>(null)
    const repeatPassword = useRef<HTMLInputElement>(null)

    const [isLoading, setisLoading] = useState(false)

    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (password.current?.value !== repeatPassword.current?.value) {
            toast.error('Passwords do not match')
            return
        }

        setisLoading(true)
        const res = await dispatch(
            register({
                email: email.current?.value!,
                repeatPassword: repeatPassword.current?.value!,
                password: password.current?.value!,
                username: username.current?.value!,
                isAdmin: false,
            })
        )
        setisLoading(false)

        if (res.meta.requestStatus === 'fulfilled') {
            toast.success('Account created')
            navigate('/')
        } else toast.error(res.payload as string)
    }

    return (
        <Container
            component='main'
            maxWidth='xs'
        >
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <PersonIcon />
                </Avatar>
                <Typography
                    component='h1'
                    variant='h5'
                >
                    Sign up
                </Typography>
                <Box
                    component='form'
                    onSubmit={handleSubmit}
                    sx={{ mt: 3 }}
                >
                    <TextField
                        margin='normal'
                        variant='outlined'
                        type={'text'}
                        label={'Full Name'}
                        inputRef={username}
                        required
                        fullWidth
                    />
                    <TextField
                        margin='normal'
                        variant='outlined'
                        type={'email'}
                        label={'Email'}
                        inputRef={email}
                        required
                        fullWidth
                    />
                    <TextField
                        margin='normal'
                        variant='outlined'
                        type={'password'}
                        label={'Password'}
                        inputRef={password}
                        required
                        fullWidth
                    />
                    <TextField
                        margin='normal'
                        variant='outlined'
                        type={'password'}
                        label={'Confirm Password'}
                        inputRef={repeatPassword}
                        required
                        fullWidth
                    />

                    <LoadingButton
                        type='submit'
                        fullWidth
                        variant='contained'
                        size='large'
                        sx={{ mt: 2, mb: 2 }}
                        loading={isLoading}
                    >
                        Sign Up
                    </LoadingButton>
                    <Grid
                        container
                        justifyContent='flex-end'
                    >
                        <Grid item>
                            <Link
                                href=''
                                variant='body2'
                                onClick={() => {
                                    navigate('/login')
                                }}
                            >
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
        // <Container>
        //     <Box
        //         ml={'auto'}
        //         mr={'auto'}
        //         mt={2}
        //         width={'60%'}
        //         component='form'
        //         onSubmit={handleSubmit}
        //     >
        //         <Typography
        //             variant={'h2'}
        //             fontWeight={700}
        //         >
        //             <Stack
        //                 direction={'row'}
        //                 alignContent='center'
        //                 justifyContent='center'
        //                 mb={2}
        //             >
        //                 <PersonIcon fontSize='inherit' />
        //                 Register
        //             </Stack>
        //         </Typography>
        //         <Typography
        //             variant={'h5'}
        //             fontWeight={700}
        //             color={'#828282'}
        //         >
        //             <Stack
        //                 direction={'row'}
        //                 alignContent='center'
        //                 justifyContent='center'
        //                 mb={2}
        //             >
        //                 Please register to get support
        //             </Stack>
        //         </Typography>
        //         <Stack spacing={2}>
        //             <TextField
        //                 variant='outlined'
        //                 type={'text'}
        //                 label={'Full Name'}
        //                 inputRef={username}
        //                 required
        //                 fullWidth
        //             />
        //             <TextField
        //                 variant='outlined'
        //                 type={'email'}
        //                 label={'Email'}
        //                 inputRef={email}
        //                 required
        //                 fullWidth
        //             />
        //             <TextField
        //                 variant='outlined'
        //                 type={'password'}
        //                 label={'Password'}
        //                 inputRef={password}
        //                 required
        //                 fullWidth
        //             />
        //             <TextField
        //                 variant='outlined'
        //                 type={'password'}
        //                 label={'Confirm Password'}
        //                 inputRef={repeatPassword}
        //                 required
        //                 fullWidth
        //             />
        //             <Button
        //                 fullWidth
        //                 type='submit'
        //                 variant='contained'
        //                 size='large'
        //             >
        //                 Register
        //             </Button>
        //         </Stack>
        //         <LoadingBackdrop isOpen={authState.isLoading} />
        //     </Box>
        // </Container>
    )
}
export default Register
