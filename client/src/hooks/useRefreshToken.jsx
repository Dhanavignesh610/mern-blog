import { useDispatch, useSelector } from "react-redux";
import axios from "../axiosAPI/axios";
import { signoutSuccess,updateAccessToken } from "../redux/user/userSlice";

export const useRefreshToken = () => {
    const dispatch = useDispatch()
    const refresh = async () => {   
       try {
        const response = await axios.get('/refresh', {   
            withCredentials: true  
        });
        const newAccessToken = response.data;
        dispatch(updateAccessToken(newAccessToken));
        return newAccessToken;
       } catch (error) {
        if (error.response?.status === 401 || error.response?.status === 403) {
            dispatch(signoutSuccess());
            throw new Error('Session expired. Please log in again.');
        } else {
            throw error;
        }
       }
    }
    return refresh;
};

