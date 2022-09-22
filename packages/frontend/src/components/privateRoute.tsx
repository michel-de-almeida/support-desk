import { Navigate } from 'react-router-dom'
import { useAppSelector } from '../app/hooks'

interface Props {
    children: JSX.Element
}
const PrivateRoute = ({ children }: Props) => {
    const { userId } = useAppSelector((state) => state.auth)

    if (userId) return children

    return <Navigate to='/login' />
}
export default PrivateRoute
