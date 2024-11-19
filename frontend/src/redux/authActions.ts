import axios from "axios";
import { createAsyncThunk } from '@reduxjs/toolkit'

const API_URL = import.meta.env.VITE_API_URL
const token = localStorage.access

type LoginResponse= {
    access: string;
    refresh: string;
    user: {
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
    password: string,
    email: string,
    first_name: string, 
    last_name: string,
    gender: string,
    profile_pic: File | null | undefined;
}, { rejectWithValue }) => {
    const formData = new FormData();

    formData.append('username', credentials.username)
    formData.append('email', credentials.email)
    formData.append('first_name', credentials.first_name)
    formData.append('last_name', credentials.last_name)
    formData.append('gender', credentials.gender)
    formData.append('password', credentials.password)

    if(credentials.profile_pic) formData.append('profile_pic', credentials.profile_pic)
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data'
        },
    }
    
    try{
        console.log(credentials)
        const response = await axios.post(`${API_URL}/signup/`, formData, config);
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