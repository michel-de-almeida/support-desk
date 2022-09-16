import axios from 'axios'
import { toast } from 'react-toastify'
import { useAppSelector, useAppDispatch } from '../app/hooks'
import { logout } from '../features/auth/authSlice'

interface Props {}
const AxiosMiddleware = (props: Props) => {
    const token = useAppSelector((state) => state.auth.user.token)
    const dispatch = useAppDispatch()

    axios.interceptors.request.use(
        (config) => {
            if (token) {
                config.headers = {
                    Authorization: `Bearer ${token}`,
                }
                console.log('token attached')
            }
            return config
        },
        (error) => {
            return Promise.reject(error)
        }
    )

    axios.interceptors.response.use(
        (response) => {
            if (response.status === 401) {
                toast.error('Session expired. Please login again')
                dispatch(logout())
            }
            return response
        },
        (error) => {
            return Promise.reject(error)
        }
    )
    return null
}

export default AxiosMiddleware
