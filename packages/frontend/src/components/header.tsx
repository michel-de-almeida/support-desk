import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import {
    AppBar,
    Box,
    Toolbar,
    Typography,
    Button,
    IconButton,
    Stack,
    Link,
    useTheme,
} from '@mui/material'
import { Menu as MenuIcon } from '@mui/icons-material'
import ThemeSwitch from './themeSwitch'
import { ChangeEvent } from 'react'
import { setUseDark } from '../redux/theme/themeSlice'
import { useLogoutMutation } from '../generated/graphql'
import { setUserId } from '../redux/auth/authSlice'

interface Props {}
const Header = (props: Props) => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const themeState = useAppSelector((state) => state.theme)
    const { userId } = useAppSelector((state) => state.auth)
    const theme = useTheme()
    const [, doLogout] = useLogoutMutation()

    const handleLogout = async () => {
        await doLogout({})
        dispatch(setUserId(''))
        navigate('/login')
    }

    const handleThemeChange = (event: ChangeEvent<HTMLInputElement>, checked: boolean) => {
        dispatch(setUseDark(checked))
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <div>{}</div>
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
                        {userId ? (
                            <Button
                                onClick={handleLogout}
                                variant='outlined'
                                sx={
                                    theme.palette.mode === 'light'
                                        ? { color: 'white', borderColor: 'white' }
                                        : {}
                                }
                            >
                                Logout
                            </Button>
                        ) : (
                            <>
                                <Button
                                    variant='outlined'
                                    onClick={() => {
                                        navigate('/login')
                                    }}
                                    sx={
                                        theme.palette.mode === 'light'
                                            ? { color: 'white', borderColor: 'white' }
                                            : {}
                                    }
                                >
                                    Login
                                </Button>
                                <Button
                                    variant='outlined'
                                    onClick={() => {
                                        navigate('/register')
                                    }}
                                    sx={
                                        theme.palette.mode === 'light'
                                            ? { color: 'white', borderColor: 'white' }
                                            : {}
                                    }
                                >
                                    Register
                                </Button>
                            </>
                        )}
                    </Stack>
                    <ThemeSwitch
                        checked={themeState.useDark}
                        onChange={handleThemeChange}
                    />
                </Toolbar>
            </AppBar>
        </Box>
    )
}
export default Header
