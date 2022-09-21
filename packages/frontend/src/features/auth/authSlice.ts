import { createSlice, PayloadAction } from '@reduxjs/toolkit'
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
    },
})

export const { setUser } = authSlice.actions

export default authSlice.reducer
