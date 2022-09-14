import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { logout } from '../features/auth/authSlice'
import {
    AppBar,
    Box,
    Toolbar,
    Typography,
    Button,
    IconButton,
    Stack,
    Link,
} from '@mui/material'
import { Menu as MenuIcon } from '@mui/icons-material'

interface Props {}
const Header = (props: Props) => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const authState = useAppSelector((state) => state.auth)

    const handleLogout = () => {
        dispatch(logout())
        navigate('/login')
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position='static'>
                <Toolbar>
                    <IconButton
                        size='large'
                        edge='start'
                        aria-label='menu'
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant='h6'
                        component='div'
                        sx={{ flexGrow: 1 }}
                    >
                        <Link
                            href=''
                            color='white'
                            underline='hover'
                            onClick={() => {
                                navigate('/')
                            }}
                        >
                            Support Desk
                        </Link>
                    </Typography>
                    <Stack
                        direction={'row'}
                        spacing={1.5}
                    >
                        {authState.user.id ? (
                            <Button onClick={handleLogout}>Logout</Button>
                        ) : (
                            <>
                                <Button
                                    onClick={() => {
                                        navigate('/login')
                                    }}
                                >
                                    Login
                                </Button>
                                <Button
                                    onClick={() => {
                                        navigate('/register')
                                    }}
                                >
                                    Register
                                </Button>
                            </>
                        )}
                    </Stack>
                </Toolbar>
            </AppBar>
        </Box>
    )
}
export default Header