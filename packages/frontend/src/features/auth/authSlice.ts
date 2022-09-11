import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit'
import { extractErrorMessage } from '../../helpers/utils'
import { authService } from './authService'
import { IUserDetail } from 'support-desk-shared'
import { ILoginData, IRegData } from 'support-desk-shared'
import { LocalStorageKeys } from '../../static/enums'

// Get user from localstorage
const localStorageUser = localStorage.getItem(LocalStorageKeys.user)
const user: IUserDetail = localStorageUser
    ? JSON.parse(localStorageUser)
    : {
          id: '',
          username: '',
          email: '',
          isAdmin: false,
      }
const initialState = {
    user: user,
    isLoading: false,
}

// Register new user
export const register = createAsyncThunk(
    'auth/register',
    async (user: IRegData, thunkAPI) => {
        try {
            return await authService.register(user)
        } catch (error) {
            return thunkAPI.rejectWithValue(extractErrorMessage(error))
        }
    }
)

// Login user
export const login = createAsyncThunk(
    'auth/login',
    async (user: ILoginData, thunkAPI) => {
        try {
            return await authService.login(user)
        } catch (error) {
            return thunkAPI.rejectWithValue(extractErrorMessage(error))
        }
    }
)

// Logout user
// NOTE: here we don't need a thunk as we are not doing anything async so we can
// use a createAction instead
export const logout = createAction('auth/logout', () => {
    authService.logout()
    // return an empty object as our payload as we don't need a payload but the
    // prepare function requires a payload return
    return { payload: {} }
})

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
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

export const {} = authSlice.actions

export default authSlice.reducer
