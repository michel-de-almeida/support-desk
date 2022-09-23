import { Login as LoginIcon } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import { Avatar, Box, Container, Grid, Link, TextField, Typography } from '@mui/material'
import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import * as yup from 'yup'
import { useAppDispatch } from '../app/hooks'
import AnimatedDiv from '../components/animatedDiv'
import { useLoginMutation } from '../generated/graphql'
import { setUser } from '../redux/auth/authSlice'
import { RouteURLs } from '../static/enums'
import { toErrorMap } from '../utils/utils'

const Login = () => {
    //graphQl hooks
    const [{ fetching }, login] = useLoginMutation()
    //router
    const navigate = useNavigate()
    //redux
    const dispatch = useAppDispatch()
    //yup schema (used with formik)
    const validationSchema = yup.object({
        email: yup.string().email('Enter a valid email').required('Email is required'),
        password: yup.string().required('Password is required'),
    })

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: validationSchema,
        onSubmit: async (values, { setErrors }) => {
            try {
                const res = await login(
                    {
                        options: values,
                    },
                    { additionalTypenames: ['User'] }
                )
                //server error
                if (res.error) toast.error(res.error.message)
                //custom error
                if (res.data?.login.errors) {
                    setErrors(toErrorMap(res.data?.login.errors))
                }
                //naviagte on success
                if (res.data?.login.user) {
                    dispatch(setUser(res.data.login.user))
                    navigate(RouteURLs.Home)
                }
            } catch (error: any) {
                toast.error(error as string)
            }
        },
    })

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
                        onSubmit={formik.handleSubmit}
                        sx={{ mt: 3 }}
                    >
                        <TextField
                            margin='normal'
                            fullWidth
                            id='email'
                            label='Email Address'
                            type='email'
                            name='email'
                            autoComplete='email'
                            autoFocus
                            onChange={formik.handleChange}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
                        />
                        <TextField
                            margin='normal'
                            fullWidth
                            name='password'
                            label='Password'
                            type='password'
                            id='password'
                            autoComplete='current-password'
                            onChange={formik.handleChange}
                            error={formik.touched.password && Boolean(formik.errors.password)}
                            helperText={formik.touched.password && formik.errors.password}
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
