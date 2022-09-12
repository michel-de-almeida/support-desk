import {
    Box,
    Button,
    Container,
    Stack,
    TextField,
    Typography,
} from '@mui/material'
import { Person as PersonIcon } from '@mui/icons-material'
import LoadingBackdrop from '../components/loadingBackdrop'
import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { register } from '../features/auth/authSlice'
import { toast } from 'react-toastify'

interface Props {}
const Register = (props: Props) => {
    const username = useRef<HTMLInputElement>(null)
    const email = useRef<HTMLInputElement>(null)
    const password = useRef<HTMLInputElement>(null)
    const repeatPassword = useRef<HTMLInputElement>(null)

    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const authState = useAppSelector((state) => state.auth)

    const handleSubmit = async (e: { preventDefault: () => void }) => {
        e.preventDefault()

        if (password.current?.value !== repeatPassword.current?.value) {
            toast.error('Passwords do not match')
            return
        }

        const res = await dispatch(
            register({
                email: email.current?.value!,
                repeatPassword: repeatPassword.current?.value!,
                password: password.current?.value!,
                username: username.current?.value!,
                isAdmin: false,
            })
        )

        if (res.meta.requestStatus === 'fulfilled') {
            toast.success('Account created')
            navigate('/')
        } else toast.error(res.payload as string)
    }

    return (
        <Container>
            <Box
                ml={'auto'}
                mr={'auto'}
                mt={2}
                width={'60%'}
                component='form'
                onSubmit={handleSubmit}
            >
                <Typography
                    variant={'h2'}
                    fontWeight={700}
                >
                    <Stack
                        direction={'row'}
                        alignContent='center'
                        justifyContent='center'
                        mb={2}
                    >
                        <PersonIcon fontSize='inherit' />
                        Register
                    </Stack>
                </Typography>
                <Typography
                    variant={'h5'}
                    fontWeight={700}
                    color={'#828282'}
                >
                    <Stack
                        direction={'row'}
                        alignContent='center'
                        justifyContent='center'
                        mb={2}
                    >
                        Please register to get support
                    </Stack>
                </Typography>
                <Stack spacing={2}>
                    <TextField
                        variant='outlined'
                        type={'text'}
                        label={'Full Name'}
                        inputRef={username}
                        required
                        fullWidth
                    />
                    <TextField
                        variant='outlined'
                        type={'email'}
                        label={'Email'}
                        inputRef={email}
                        required
                        fullWidth
                    />
                    <TextField
                        variant='outlined'
                        type={'password'}
                        label={'Password'}
                        inputRef={password}
                        required
                        fullWidth
                    />
                    <TextField
                        variant='outlined'
                        type={'password'}
                        label={'Confirm Password'}
                        inputRef={repeatPassword}
                        required
                        fullWidth
                    />
                    <Button
                        fullWidth
                        type='submit'
                        variant='contained'
                        size='large'
                    >
                        Register
                    </Button>
                </Stack>
                <LoadingBackdrop isOpen={authState.isLoading} />
            </Box>
        </Container>
    )
}
export default Register
