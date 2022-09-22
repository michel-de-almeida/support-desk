import { Login as LoginIcon } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import { Avatar, Box, Container, Grid, Link, TextField, Typography } from '@mui/material'
import { FormEvent, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useAppDispatch } from '../app/hooks'
import AnimatedDiv from '../components/animatedDiv'
import { setUserId } from '../redux/auth/authSlice'
import { useLoginMutation } from '../generated/graphql'
import { RouteURLs } from '../static/enums'
import { toErrorMap } from '../utils/utils'

const Login = () => {
    //inputs
    const email = useRef<HTMLInputElement>(null)
    const password = useRef<HTMLInputElement>(null)

    //graphQl hooks
    const [{ fetching }, login] = useLoginMutation()

    //router
    const navigate = useNavigate()

    //redux
    const dispatch = useAppDispatch()

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        try {
            const res = await login({
                options: { email: email.current?.value!, password: password.current?.value! },
            })
            //server error
            if (res.error) toast.error(res.error.message)
            //custom error
            if (res.data?.login.errors) toast.error(toErrorMap(res.data?.login.errors).toString())
            //naviagte on success
            if (res.data?.login.user) {
                dispatch(setUserId(res.data.login.user._id))
                navigate(RouteURLs.Home)
            }
        } catch (error: any) {
            toast.error(error as string)
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
                        <LoginIcon />
                    </Avatar>
                    <Typography
                        component='h1'
                        variant='h5'
                    >
                        Sign in
                    </Typography>
                    <Box
                        component='form'
                        onSubmit={handleSubmit}
                        sx={{ mt: 3 }}
                    >
                        <TextField
                            margin='normal'
                            required
                            fullWidth
                            id='email'
                            label='Email Address'
                            type='email'
                            name='email'
                            autoComplete='email'
                            autoFocus
                            inputRef={email}
                        />
                        <TextField
                            margin='normal'
                            required
                            fullWidth
                            name='password'
                            label='Password'
                            type='password'
                            id='password'
                            autoComplete='current-password'
                            inputRef={password}
                        />
                        <LoadingButton
                            type='submit'
                            fullWidth
                            variant='contained'
                            size='large'
                            sx={{ mt: 3, mb: 2 }}
                            loading={fetching}
                        >
                            Sign In
                        </LoadingButton>
                        <Grid container>
                            <Grid
                                item
                                xs
                            >
                                <Link
                                    href='#'
                                    variant='body2'
                                >
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link
                                    href=''
                                    variant='body2'
                                    onClick={() => {
                                        navigate(RouteURLs.Register)
                                    }}
                                >
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </AnimatedDiv>
    )
}
export default Login
