import { Container } from '@mui/material'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { BrowserRouter as Router } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { useAppSelector } from './app/hooks'
import 'react-toastify/dist/ReactToastify.css'
import Header from './components/header'
import { darkTheme, lightTheme } from './theme'
import AnimatedRoutes from './app/animatedRoutes'

function App() {
    const themeState = useAppSelector((state) => state.theme)

    let currentTheme = themeState.useDark ? darkTheme : lightTheme

    return (
        <ThemeProvider theme={currentTheme}>
            <CssBaseline />
            <Container fixed>
                <link
                    rel='stylesheet'
                    href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap'
                />

                <Router>
                    <Header />
                    <AnimatedRoutes />
                </Router>
                <ToastContainer
                    position='top-center'
                    theme={currentTheme.palette.mode}
                    autoClose={2000}
                />
            </Container>
        </ThemeProvider>
    )
}

export default App
