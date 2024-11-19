
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

type AuthState = {
    access: string | null
}

type UserDetails = {
    id: string;
    username: string;
    email: string;
}

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: import.meta.env.VITE_API_URL,
    prepareHeaders: (headers, { getState } ) => {
        const token = (getState() as {auth: AuthState}).auth.access
        if(token) {
            headers.set('Authorization', `Bearer ${token}`)
        }
        return headers
    }
   }),
  endpoints: (builder) => ({
    getUserDetails: builder.query<UserDetails, string>({
      query: (userId) => ({
        url: `/get_user/${userId}`,
        method: 'GET',
      })}),
    }),
  });

export const { useGetUserDetailsQuery } = authApi