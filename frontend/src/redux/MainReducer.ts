import { combineReducers } from "redux";
import AuthReducer from "./authSlice";


const MainReducer = combineReducers({
    AuthReducer
});

export default MainReducer;