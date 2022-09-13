import {
    Container,
    TextField,
    Box,
    Typography,
    Avatar,
    FormControlLabel,
    Grid,
    Link,
    Checkbox,
} from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { Login as LoginIcon } from '@mui/icons-material'
import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { login } from '../features/auth/authSlice'
import { toast } from 'react-toastify'

interface Props {}
const Login = (props: Props) => {
    const email = useRef<HTMLInputElement>(null)
    const password = useRef<HTMLInputElement>(null)
    const [isLoading, setisLoading] = useState(false)

    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const authState = useAppSelector((state) => state.auth)

    const handleSubmit = async (e: { preventDefault: () => void }) => {
        e.preventDefault()

        setisLoading(true)
        const res = await dispatch(
            login({
                email: email.current?.value!,
                password: password.current?.value!,
            })
        )
        setisLoading(false)

        if (res.meta.requestStatus === 'fulfilled') {
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
                    <FormControlLabel
                        control={
                            <Checkbox
                                value='remember'
                                color='primary'
                            />
                        }
                        label='Remember me'
                    />
                    <LoadingButton
                        type='submit'
                        fullWidth
                        variant='contained'
                        size='large'
                        sx={{ mt: 3, mb: 2 }}
                        loading={isLoading}
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
                                href='#'
                                variant='body2'
                            >
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    )
}
export default Login
