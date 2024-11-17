import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const useAuth = () => {
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated)
    return isAuthenticated;
}

export default useAuth;