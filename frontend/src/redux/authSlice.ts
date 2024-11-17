import { createSlice } from "@reduxjs/toolkit";
import { login, refreshToken, getUser, signup} from './authService';

interface AuthState{
    access: string | null;
    refresh: string | null;
    isAuthenticated: boolean;
    user: any,
    message: string;
    error: string | null;
}

const initialState: AuthState = {
    access: localStorage.getItem('access'),
    refresh: localStorage.getItem('refresh'),
    isAuthenticated: !!localStorage.getItem("access"),
    user: null,
    message: "",
    error: null
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout(state) {
            state.access = null;
            state.refresh = null;
            state.isAuthenticated = false;
            state.user = null;
            localStorage.removeItem("access");
            localStorage.removeItem("refresh");
        },
        closeAlert(state){
            state.message = '',
            state.error = null;
        },
    },
    
    extraReducers: (builder) => {
        
        builder
        .addCase(login.fulfilled, (state,action) => {
            state.access = action.payload.access;
            state.refresh = action.payload.refresh;
            state.isAuthenticated = true;
            state.user = action.payload.user;
            state.message = "Login was successful"
            localStorage.setItem("access", action.payload.access);
            localStorage.setItem("refresh", action.payload.refresh);
        })
        .addCase(login.rejected, (state, action) => {
            state.isAuthenticated = false;
            state.error = action.payload as string | "Login failed";
        }) 
        .addCase(signup.fulfilled, (state, action) => {
            localStorage.setItem('access', action.payload.access);
            localStorage.setItem('refresh', action.payload.refresh)

            state.access = action.payload.access;
            state.refresh = action.payload.refresh;
            state.isAuthenticated = true;
            state.user = action.payload.user;
            state.message = 'Signup Successful';
        })
        .addCase(refreshToken.fulfilled, (state, action) => {
            state.access = action.payload.access;
            localStorage.setItem('access', action.payload.access);
        })
        .addCase(refreshToken.rejected, (state, action) => {
            state.isAuthenticated = false;
            state.error = action.payload as string | "You are not authorized"
        })
        .addCase(getUser.fulfilled, (state, action) => {
            state.user = action.payload
        })
        .addCase(getUser.rejected, (state, action) => {
            state.message = action.payload as string
        })
    }
})


export const { logout, closeAlert } = authSlice.actions;
export default authSlice.reducer