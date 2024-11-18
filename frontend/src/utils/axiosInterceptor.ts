import axios from "axios";
import { refreshToken } from "../redux/authActions";
import store from "../redux/store";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    // withCredentials: true
});

// api.interceptors.request.use(
//     (config) => {
//         const accessToken = store.getState().auth.access
//         if(accessToken) {
//             config.headers["Authorization"] = `Bearer ${accessToken}`;
//         }
//         return config;
//     },
//     (error: boolean) => Promise.reject(error)
// );

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response.status === 401 &&
            error.config && 
            !error.config._retry){
            error.config._retry = true;

            const refresh = store.getState().auth.refresh
            if (refresh){
                try{
                    const newTokens = await store.dispatch(refreshToken(refresh));
                    error.config.headers["Authorization"] = `Bearer ${newTokens.payload.access}`;
                    return api(error.config);
                }
                catch(refreshError){
                    console.error("Token refresh failed:", refreshError);
                }
            }
        }
        return Promise.reject(error)
    }
)

export default api;