import {
    Container,
    TextField,
    Box,
    Stack,
    Button,
    Typography,
} from '@mui/material'
import { Login as LoginIcon } from '@mui/icons-material'
import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { login } from '../features/auth/authSlice'
import { toast } from 'react-toastify'
import LoadingBackdrop from '../components/loadingBackdrop'

interface Props {}
const Login = (props: Props) => {
    const email = useRef<HTMLInputElement>(null)
    const password = useRef<HTMLInputElement>(null)

    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const authState = useAppSelector((state) => state.auth)

    const handleSubmit = async (e: { preventDefault: () => void }) => {
        e.preventDefault()

        const res = await dispatch(
            login({
                email: email.current?.value!,
                password: password.current?.value!,
            })
        )

        if (res.meta.requestStatus === 'fulfilled') {
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
                        mb={1}
                    >
                        <LoginIcon fontSize='inherit' />
                        Login
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
                        Please login to get support
                    </Stack>
                </Typography>
                <Stack spacing={2}>
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
                    <Button
                        fullWidth
                        type='submit'
                        variant='contained'
                        size='large'
                    >
                        Login
                    </Button>
                </Stack>
                <LoadingBackdrop isOpen={authState.isLoading} />
            </Box>
        </Container>
    )
}
export default Login
