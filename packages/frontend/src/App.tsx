import { Container } from '@mui/material'
import { BrowserRouter as Router } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Header from './components/header'
import theme from './theme'
import AnimatedRoutes from './app/animatedRoutes'

function App() {
    return (
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
                theme={theme.palette.mode}
                autoClose={2000}
            />
        </Container>
    )
}

export default App
