import axios from "axios";
import { createAsyncThunk } from '@reduxjs/toolkit'

const API_URL = import.meta.env.VITE_API_URL
const token = localStorage.access

interface LoginResponse{
    access: string;
    refresh: string;
    userInfo: {
        id: string;
        fname: string;
        lname: string;
        username: string;
        email: string;
    }
}

export const login = createAsyncThunk<LoginResponse, {username: string; password: string}>(
    'auth/login',
    async (credentials, { rejectWithValue }) => {
    try{
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const response = await axios.post(`${API_URL}/login/`, credentials, config);
        return response.data as LoginResponse;

    } catch(error: any){
        // if(axios.isAxiosError(error) && error.response){
        //     return rejectWithValue(error.response.data)
        // }
        if (error.response && error.response.data.message){
            return rejectWithValue(error.response.data.message)
        } else {
            return rejectWithValue(error.message)
        }
    }
});


export const signup = createAsyncThunk('auth/signup', async(credentials: {
    username: string,
    password1: string,
    password2: string,
    email: string,
    fname: string, 
    lname: string,
    gender: string
}, { rejectWithValue }) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        },
    }
    try{
        const response = await axios.post(`${API_URL}/registration/`, credentials, config);
        return response.data
    }
    catch(error: any){
        // if (axios.isAxiosError(error) && error.response){
        //     const data = error.response.data
        //     return rejectWithValue(data);
        // }
        if(error.response && error.response.data.message){
            return rejectWithValue(error.response.data.message)
        } else {
            return rejectWithValue(error.message)
        }
    }
})

export const refreshToken = createAsyncThunk('auth/refreshToken', async (refreshToken: string) => {
    const response = await axios.post(`${API_URL}/token/refresh/`, { refresh: refreshToken })
    return response.data
});

export const getUser = createAsyncThunk('auth/getUser', async(_, { rejectWithValue }) => {
    try{
        const response = await axios.get(`${API_URL}/get_user/`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        return response.data;
    } catch(error: any){
        if(error.response && error.response.data){
            return rejectWithValue(error.response.data.message);
        }
        return rejectWithValue('Failed to fetch user data');
    }
})

export const signUp = async (signUpData: {
    username: string;
    email: string;
    password: string;
}) => {
    const response = await axios.post(`${API_URL}/signup/`, signUpData);
    return response.data;
};