import { createSlice } from "@reduxjs/toolkit";
import { login, refreshToken, getUser, signup} from './authActions';

interface AuthState{
    loading: boolean;
    access: string | null;
    refresh: string | null;
    userInfo: any;
    error: string | null;
    success: boolean;
}

const initialState: AuthState = {
    loading: false,
    access: localStorage.getItem('access') || null,
    refresh: localStorage.getItem('refresh') || null,
    userInfo: null,
    error: null,
    success: false,
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout(state) {
            state.access = null;
            state.refresh = null;
            state.userInfo = null;
            localStorage.removeItem("access");
            localStorage.removeItem("refresh");
        }
    },
    
    extraReducers: (builder) => { builder
        .addCase(login.pending, (state, action) => {
            state.loading = true,
            state.error = null
        })
        .addCase(login.fulfilled, (state,action) => {
            if (action) {
                state.loading = false
                state.userInfo = action.payload
                state.access = action.payload.access
                state.refresh = action.payload.refresh
            }
        })
        .addCase(login.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload as string | "Login failed";
        }) 
        .addCase(signup.pending, (state, action) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(signup.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
        })
        .addCase(signup.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string
        })
        .addCase(refreshToken.fulfilled, (state, action) => {
            state.access = action.payload.access;
            localStorage.setItem('access', action.payload.access);
        })
        .addCase(refreshToken.rejected, (state, action) => {
            state.error = action.payload as string | "You are not authorized"
        })
        .addCase(getUser.fulfilled, (state, action) => {
            state.userInfo = action.payload.user;
        })
        .addCase(getUser.rejected, (state, action) => {
            state.error = action.payload as string
        })
    }
})


export const { logout } = authSlice.actions;
export default authSlice.reducer