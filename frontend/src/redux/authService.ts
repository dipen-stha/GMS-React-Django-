import axios from "axios";
import { createAsyncThunk } from '@reduxjs/toolkit'

const API_URL = import.meta.env.VITE_API_URL

export const login = createAsyncThunk('auth/login',async (credentials: {username: string; password: string}, {rejectWithValue}) => {
    try{

        const response = await axios.post(`${API_URL}/login/`, credentials);
        return response.data;
    } catch(error){
        if(axios.isAxiosError(error) && error.response){
            return rejectWithValue(error.response.data)
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
    try{
        const response = await axios.post(`${API_URL}/registration/`, credentials);
        return response.data
    }
    catch(error){
        if (axios.isAxiosError(error) && error.response){
            const data = error.response.data
            return rejectWithValue(data);
        }
    }
})

export const refreshToken = createAsyncThunk('auth/refreshToken', async (refreshToken: string) => {
    const response = await axios.post(`${API_URL}/token/refresh/`, { refresh: refreshToken })
    return response.data
});

export const getUser = createAsyncThunk('auth/getUser', async(_, { rejectWithValue }) => {
    try{
        const response = await axios.get(`${API_URL}/user`);
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