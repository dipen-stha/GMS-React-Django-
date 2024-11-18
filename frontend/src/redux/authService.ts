
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

interface AuthState{
    access: string | null
}

interface UserDetails {
    id: string;
    username: string;
    email: string;
}

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.BASE_URL,
    prepareHeaders: (headers, { getState } ) => {
        const token = (getState() as {auth: AuthState}).auth.access;
        if(token) {
            headers.set('Authorization', `Bearer ${token}`)
        }
        return headers
    }
   }),
  endpoints: (builder) => ({
    getUserDetails: builder.query<UserDetails, void>({
      query: () => ({
        url: 'api/get_user/',
        method: 'GET',
      })}),
    }),
  });

export const { useGetUserDetailsQuery } = authApi