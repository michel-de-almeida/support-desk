import axios from 'axios'
import { ILoginData, IRegData, IUserDetail } from 'support-desk-shared'
import { LocalStorageKeys } from '../../static/enums'

const API_URL = '/api/users'

// Register user
const register = async (regData: IRegData) => {
    const response = await axios.post(API_URL, regData)

    if (response.data) {
        localStorage.setItem(
            LocalStorageKeys.user,
            JSON.stringify(response.data)
        )
    }
    return response.data as IUserDetail
}

// Login user
const login = async (loginData: ILoginData, isPersist: boolean = false) => {
    const response = await axios.post(`${API_URL}/login`, loginData)

    if (isPersist && response.data) {
        localStorage.setItem(
            LocalStorageKeys.user,
            JSON.stringify(response.data)
        )
    }
    return response.data as IUserDetail
}

// Logout user
const logout = () => localStorage.removeItem(LocalStorageKeys.user)

export const authService = {
    register,
    logout,
    login,
}
