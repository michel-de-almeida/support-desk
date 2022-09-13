import { Container } from '@mui/material'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Header from './components/header'
import Home from './pages/home'
import Login from './pages/login'
import Register from './pages/register'
import Tickets from './pages/tickets'
import theme from './theme'

function App() {
    return (
        <Container fixed>
            <link
                rel='stylesheet'
                href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap'
            />

            <Router>
                <Header />
                <Routes>
                    <Route
                        path='/'
                        element={<Home />}
                    />
                    <Route
                        path='/login'
                        element={<Login />}
                    />
                    <Route
                        path='/register'
                        element={<Register />}
                    />
                    <Route
                        path='/tickets'
                        element={<Tickets />}
                    />
                </Routes>
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
