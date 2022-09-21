import { Person as PersonIcon } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import { Avatar, Box, Container, Grid, Link, TextField, Typography } from '@mui/material'
import { FormEvent, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import AnimatedDiv from '../components/animatedDiv'
import { useRegisterMutation } from '../generated/graphql'
import { RouteURLs } from '../static/enums'
import { toErrorMap } from '../utils/utils'

const Register = () => {
    const username = useRef<HTMLInputElement>(null)
    const email = useRef<HTMLInputElement>(null)
    const password = useRef<HTMLInputElement>(null)
    const repeatPassword = useRef<HTMLInputElement>(null)
    const [{ fetching }, register] = useRegisterMutation()

    const navigate = useNavigate()

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (password.current?.value !== repeatPassword.current?.value) {
            toast.error('Passwords do not match')
            return
        }

        try {
            const res = await register({
                options: {
                    email: email.current?.value!,
                    password: password.current?.value!,
                    username: username.current?.value!,
                },
            })
            //server error
            if (res.error) {
                toast.error(res.error.message)
                return
            }
            //custom error
            if (res.data?.register.errors)
                toast.error(toErrorMap(res.data?.register.errors).toString())
            //naviagte on success
            if (res.data?.register.user) {
                toast.success('Account created')
                navigate(RouteURLs.Home)
            }
        } catch (error: any) {
            toast.error(error as string)
            return
        }
    }

    return (
        <AnimatedDiv>
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
                            loading={fetching}
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
                                        navigate(RouteURLs.Login)
                                    }}
                                >
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </AnimatedDiv>
    )
}
export default Register
