import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { LocalStorageKeys } from '../../static/enums'

const lsSetting = localStorage.getItem(LocalStorageKeys.useDark) === 'true'

const initialState = {
    useDark: lsSetting ? lsSetting : false,
}

const themeSlice = createSlice({
    name: 'theme',
    initialState: initialState,
    reducers: {
        setUseDark: (state, action: PayloadAction<boolean>) => {
            state.useDark = action.payload
            localStorage.setItem(
                LocalStorageKeys.useDark,
                action.payload.toString()
            )
        },
    },
})

export const { setUseDark } = themeSlice.actions

export default themeSlice.reducer
