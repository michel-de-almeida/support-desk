import { Container } from '@mui/material'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { BrowserRouter as Router } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { useAppSelector } from './app/hooks'
import 'react-toastify/dist/ReactToastify.css'
import Header from './components/header'
import { darkTheme, lightTheme } from './theme'
import AnimatedRoutes from './app/animatedRoutes'
import AxiosMiddleware from './middleware/axiosMiddleware'
import { createClient, Provider as URQLProvider } from 'urql'

const client = createClient({
    url: 'http://localhost:5000/graphql',
    fetchOptions: {
        credentials: 'include',
    },
})

function App() {
    const themeState = useAppSelector((state) => state.theme)

    let currentTheme = themeState.useDark ? darkTheme : lightTheme

    return (
        <ThemeProvider theme={currentTheme}>
            <AxiosMiddleware />

            <CssBaseline />
            <Container fixed>
                <link
                    rel='stylesheet'
                    href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap'
                />

                <Router>
                    <URQLProvider value={client}>
                        <Header />
                        <AnimatedRoutes />
                    </URQLProvider>
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
