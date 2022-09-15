import axios from 'axios'
import { ILoginData, IRegData, API_URLS, IResponseData } from 'support-desk-shared'
import { LocalStorageKeys } from '../../static/enums'

// Register user
const register = async (regData: IRegData): Promise<IResponseData> => {
    const response = await axios.post(API_URLS.Users, regData)

    if (response.data) {
        localStorage.setItem(LocalStorageKeys.User, JSON.stringify(response.data.payload))
    }
    return response.data
}

// Login user
const login = async (loginData: ILoginData, isPersist: boolean = false): Promise<IResponseData> => {
    const response = await axios.post(`${API_URLS.Users}/login`, loginData)

    if (isPersist && response.data) {
        localStorage.setItem(LocalStorageKeys.User, JSON.stringify(response.data.payload))
    }
    return response.data
}

// Logout user
const logout = () => localStorage.removeItem(LocalStorageKeys.User)

export const AuthService = {
    register,
    logout,
    login,
}
