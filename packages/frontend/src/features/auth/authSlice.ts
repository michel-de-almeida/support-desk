import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { extractErrorMessage } from '../../helpers/utils'
import { AuthService } from './authService'
import { IUserDetail, ILoginData, IRegData } from 'support-desk-shared'
import { LocalStorageKeys } from '../../static/enums'

// Get user from localstorage
const localStorageUser = localStorage.getItem(LocalStorageKeys.User)
const emptyUser: IUserDetail = {
    id: '',
    username: '',
    email: '',
    isAdmin: false,
}
const user: IUserDetail = localStorageUser
    ? JSON.parse(localStorageUser)
    : emptyUser
const initialState = {
    user: user,
    isLoading: false,
}

// Register new user
export const register = createAsyncThunk(
    'auth/register',
    async (user: IRegData, thunkAPI) => {
        try {
            return await AuthService.register(user)
        } catch (error) {
            return thunkAPI.rejectWithValue(extractErrorMessage(error))
        }
    }
)

interface ILoginActionData {
    user: ILoginData
    isPersist: boolean
}

// Login user
export const login = createAsyncThunk(
    'auth/login',
    async (loginData: ILoginActionData, thunkAPI) => {
        try {
            return await AuthService.login(loginData.user, loginData.isPersist)
        } catch (error) {
            return thunkAPI.rejectWithValue(extractErrorMessage(error))
        }
    }
)

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            AuthService.logout()
            state.user = emptyUser
        },
    },
    extraReducers(builder) {
        builder
            .addCase(register.pending, (state) => {
                state.isLoading = true
            })
            .addCase(register.fulfilled, (state, action) => {
                state.user = action.payload
                state.isLoading = false
            })
            .addCase(register.rejected, (state) => {
                state.isLoading = false
            })
            .addCase(login.pending, (state) => {
                state.isLoading = true
            })
            .addCase(login.fulfilled, (state, action) => {
                state.user = action.payload
                state.isLoading = false
            })
            .addCase(login.rejected, (state) => {
                state.isLoading = false
            })
    },
})

export const { logout } = authSlice.actions

export default authSlice.reducer
