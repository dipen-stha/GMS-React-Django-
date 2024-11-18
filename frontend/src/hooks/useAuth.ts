// import { useSelector } from "react-redux";
// import { AppDispatch, RootState } from "../redux/store";
// import { useDispatch } from "react-redux";
// import { useEffect } from "react";
// import { getUser } from "../redux/authService";

// export const useAuth = () => {
//     const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated)
//     return isAuthenticated;
// }

// export const useAuthUser= () => {
//     const dispatch = useDispatch<AppDispatch>();
//     const user = useSelector((state: RootState) => state.auth.userInfo)

//     useEffect(() => {
//         if(!user) {
//             dispatch(getUser());
//         }
//     }, [dispatch, user])

//     return user
// }