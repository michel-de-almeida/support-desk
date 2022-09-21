import PrivateRoute from '../components/privateRoute'
import Home from '../pages/home'
import Login from '../pages/login'
import NewTicket from '../pages/newTicket'
import Register from '../pages/register'
import Ticket from '../pages/ticket'
import Tickets from '../pages/tickets'
import { RouteURLs } from '../static/enums'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'

interface Props {}
const AnimatedRoutes = (props: Props) => {
    const location = useLocation()

    return (
        <AnimatePresence>
            <Routes
                location={location}
                key={location.pathname}
            >
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
                        <Ticket />
                        // <PrivateRoute>

                        // </PrivateRoute>
                    }
                />
            </Routes>
        </AnimatePresence>
    )
}
export default AnimatedRoutes
