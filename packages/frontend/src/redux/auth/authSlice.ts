import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { LocalStorageKeys } from '../../static/enums'

const ls = localStorage.getItem(LocalStorageKeys.User)

const emptyState = {
    userId: '',
}

const authSlice = createSlice({
    name: 'auth',
    initialState: ls ? JSON.parse(ls) : emptyState,
    reducers: {
        setUserId: (state, action: PayloadAction<string>) => {
            state.userId = action.payload
            localStorage.setItem(LocalStorageKeys.User, JSON.stringify({ userId: action.payload }))
        },
    },
})

export const { setUserId } = authSlice.actions

export default authSlice.reducer
