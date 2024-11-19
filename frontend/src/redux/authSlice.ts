import { createSlice } from "@reduxjs/toolkit";
import { login, refreshToken, getUser, signup} from './authActions';

type AuthState = {
    loading: boolean;
    access: string | null;
    refresh: string | null;
    user: any;
    isAuthenticated: boolean;
    error: string | null;
    success: boolean;
}

const initialState: AuthState = {
    loading: false,
    access: localStorage.getItem('access') || null,
    refresh: localStorage.getItem('refresh'),
    user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : null,
    isAuthenticated: !!localStorage.getItem('access'),
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
            state.user = null;
            state.isAuthenticated = false;
            localStorage.removeItem("access");
            localStorage.removeItem("refresh");
            localStorage.removeItem("user");
        }
    },
    
    extraReducers: (builder) => { builder
        .addCase(login.pending, (state, action) => {
            state.loading = true,
            state.error = null
        })
        .addCase(login.fulfilled, (state,action) => {
            if (action) {
                localStorage.setItem("access", action.payload.access)
                localStorage.setItem("refresh", action.payload.refresh)
                localStorage.setItem("user", JSON.stringify(action.payload.user))
                state.loading = false
                state.user = action.payload
                state.access = action.payload.access
                state.refresh = action.payload.refresh
                state.isAuthenticated = true;
            }
        })
        .addCase(login.rejected, (state, action) => {
            state.loading = false
            state.isAuthenticated = false
            state.error = action.payload as string | "Login failed";
        }) 
        .addCase(signup.pending, (state, action) => {
            state.loading = true;
            state.isAuthenticated = false
            state.error = null;
        })
        .addCase(signup.fulfilled, (state, action) => {
            state.loading = false;
            state.isAuthenticated = false
            state.success = true;
        })
        .addCase(signup.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string
        })
        .addCase(refreshToken.fulfilled, (state, action) => {
            state.access = action.payload.access;
            state.isAuthenticated = true;
            localStorage.setItem('access', action.payload.access);
        })
        .addCase(refreshToken.rejected, (state, action) => {
            localStorage.removeItem("user");
            localStorage.removeItem("access");
            localStorage.removeItem("refresh");
            state.isAuthenticated = false;
            state.error = action.payload as string | "You are not authorized"
        })
        .addCase(getUser.fulfilled, (state, action) => {
            state.user = action.payload.user;
        })
        .addCase(getUser.rejected, (state, action) => {
            state.error = action.payload as string
        })
    }
})


export const { logout } = authSlice.actions;
export default authSlice.reducer