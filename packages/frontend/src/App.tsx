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
import { RouteURLs } from './static/enums'

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
                        path={RouteURLs.Home}
                        element={<Home />}
                    />
                    <Route
                        path={RouteURLs.Login}
                        element={<Login />}
                    />
                    <Route
                        path={RouteURLs.Register}
                        element={<Register />}
                    />
                    <Route
                        path={RouteURLs.Tickets}
                        element={
                            <PrivateRoute>
                                <Tickets />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path={RouteURLs.NewTicket}
                        element={
                            <PrivateRoute>
                                <NewTicket />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path={`${RouteURLs.Ticket}/:ticketId`}
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
