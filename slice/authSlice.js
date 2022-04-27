import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    loading: true,
    token: null,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, payload) => {
            state.token = payload;
            
        },

        logout: (state) => {
            state.token = null;
        },

        restoreToken: (state, {payload}) => {
            state.token = payload.token;
            state.loading = false
        }
    },
})

export const { login, logout, restoreToken } = authSlice.actions
export default authSlice.reducer