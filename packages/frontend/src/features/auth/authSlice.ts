import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AuthService } from './authService'
import { User } from '../../generated/graphql'

const emptyUser: User = {
    _id: '',
    email: '',
    roles: [],
    username: '',
}

const initialState = {
    user: emptyUser,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<User>) => {
            state.user = action.payload
        },
        logout: (state) => {
            AuthService.logout()
            state.user = emptyUser
        },
    },
})

export const { logout, setUser } = authSlice.actions

export default authSlice.reducer
