import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

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

export const useAuthState = () => {
    const { loading, user, error, success, isAuthenticated }: {
      loading: boolean;
      user: any;
      error: any;
      success: boolean;
      isAuthenticated: boolean;
    } = useSelector((state: RootState) => state.auth);
  
    return { loading, user, error, success, isAuthenticated };
  };
