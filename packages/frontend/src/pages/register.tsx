import { Person as PersonIcon } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import { Avatar, Box, Container, Grid, Link, TextField, Typography } from '@mui/material'
import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import * as yup from 'yup'
import { useAppDispatch } from '../app/hooks'
import AnimatedDiv from '../components/animatedDiv'
import { useRegisterMutation } from '../generated/graphql'
import { setUser } from '../redux/auth/authSlice'
import { RouteURLs } from '../static/enums'
import { toErrorMap } from '../utils/utils'

const Register = () => {
    //graphQL hooks
    const [{ fetching }, register] = useRegisterMutation()
    //redux
    const dispatch = useAppDispatch()
    //router
    const navigate = useNavigate()
    //yup schema (used with formik)
    const validationSchema = yup.object({
        username: yup.string().required('Full name is required'),
        email: yup.string().email('Enter a valid email').required('Email is required'),
        password: yup
            .string()
            .required('Password is required')
            .min(8, 'Password must be at least 8 characters long'),
        repeatPassword: yup
            .string()
            .required('Confirm password is required')
            .min(8, 'Password must be at least 8 characters long')
            .oneOf([yup.ref('password'), null], 'Passwords must match'),
    })

    const formik = useFormik({
        initialValues: {
            username: '',
            email: '',
            password: '',
            repeatPassword: '',
        },
        validationSchema: validationSchema,
        onSubmit: async (values, { setErrors }) => {
            try {
                const res = await register({
                    options: {
                        email: values.email,
                        password: values.password,
                        username: values.username,
                    },
                })
                //server error
                if (res.error) {
                    toast.error(res.error.message)
                    return
                }
                //custom error
                if (res.data?.register.errors) setErrors(toErrorMap(res.data?.register.errors))
                //naviagte on success
                if (res.data?.register.user) {
                    dispatch(setUser(res.data?.register.user))
                    toast.success('Account created')
                    navigate(RouteURLs.Home)
                }
            } catch (error: any) {
                toast.error(error as string)
                return
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
                        onSubmit={formik.handleSubmit}
                        sx={{ mt: 3 }}
                    >
                        <TextField
                            id='username'
                            name='username'
                            margin='normal'
                            variant='outlined'
                            type={'text'}
                            label={'Full Name'}
                            fullWidth
                            onChange={formik.handleChange}
                            error={formik.touched.username && Boolean(formik.errors.username)}
                            helperText={formik.touched.username && formik.errors.username}
                        />
                        <TextField
                            id='email'
                            name='email'
                            margin='normal'
                            variant='outlined'
                            type={'email'}
                            label={'Email'}
                            fullWidth
                            onChange={formik.handleChange}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
                        />
                        <TextField
                            id='password'
                            name='password'
                            margin='normal'
                            variant='outlined'
                            type={'password'}
                            label={'Password'}
                            fullWidth
                            onChange={formik.handleChange}
                            error={formik.touched.password && Boolean(formik.errors.password)}
                            helperText={formik.touched.password && formik.errors.password}
                        />
                        <TextField
                            id='repeatPassword'
                            name='repeatPassword'
                            margin='normal'
                            variant='outlined'
                            type={'password'}
                            label={'Confirm Password'}
                            fullWidth
                            onChange={formik.handleChange}
                            error={
                                formik.touched.repeatPassword &&
                                Boolean(formik.errors.repeatPassword)
                            }
                            helperText={
                                formik.touched.repeatPassword && formik.errors.repeatPassword
                            }
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
