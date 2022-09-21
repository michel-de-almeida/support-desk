import { Navigate } from 'react-router-dom'
import { useMeQuery } from '../generated/graphql'

interface Props {
    children: JSX.Element
}
const PrivateRoute = ({ children }: Props) => {
    //graphQL hook
    const [{ data }] = useMeQuery()

    if (data?.me._id) return children

    return <Navigate to='/login' />
}
export default PrivateRoute
