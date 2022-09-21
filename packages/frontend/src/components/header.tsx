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
import { ChangeEvent, useEffect } from 'react'
import { setUseDark } from '../features/theme/themeSlice'
import { useLogoutMutation, useMeQuery, User } from '../generated/graphql'
import { setUser } from '../features/auth/authSlice'

interface Props {}
const Header = (props: Props) => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const themeState = useAppSelector((state) => state.theme)
    const { user } = useAppSelector((state) => state.auth)
    const theme = useTheme()
    const [{ data }, getMe] = useMeQuery({ pause: true })
    const [, doLogout] = useLogoutMutation()

    const emptyUser: User = {
        _id: '',
        email: '',
        roles: [],
        username: '',
    }

    useEffect(() => {
        getMe()
        dispatch(setUser(data?.me!))
    }, [dispatch, getMe, data?.me])

    const handleLogout = async () => {
        await doLogout({})
        dispatch(setUser(emptyUser))
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
                        {user?._id ? (
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
