import { Container } from '@mui/material'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Header from './components/header'
import PrivateRoute from './components/privateRoute'
import Home from './pages/home'
import Login from './pages/login'
import NewTicket from './pages/newTicket'
import Register from './pages/register'
import Ticket from './pages/ticket'
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
                        element={
                            <PrivateRoute>
                                <Tickets />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path='/new-ticket'
                        element={
                            <PrivateRoute>
                                <NewTicket />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path='/ticket/:ticketId'
                        element={
                            <PrivateRoute>
                                <Ticket />
                            </PrivateRoute>
                        }
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
