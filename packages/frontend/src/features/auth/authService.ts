import axios from 'axios'
import {
    ILoginData,
    IRegData,
    IUserDetail,
    API_URLS,
} from 'support-desk-shared'
import { LocalStorageKeys } from '../../static/enums'

// Register user
const register = async (regData: IRegData) => {
    const response = await axios.post(API_URLS.Users, regData)

    if (response.data) {
        localStorage.setItem(
            LocalStorageKeys.User,
            JSON.stringify(response.data)
        )
    }
    return response.data as IUserDetail
}

// Login user
const login = async (loginData: ILoginData, isPersist: boolean = false) => {
    const response = await axios.post(`${API_URLS.Users}/login`, loginData)

    if (isPersist && response.data) {
        localStorage.setItem(
            LocalStorageKeys.User,
            JSON.stringify(response.data)
        )
    }
    return response.data as IUserDetail
}

// Logout user
const logout = () => localStorage.removeItem(LocalStorageKeys.User)

export const AuthService = {
    register,
    logout,
    login,
}
