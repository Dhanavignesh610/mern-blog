import { useEffect } from "react";
import { axiosPrivate } from "../axiosAPI/axios";
import { useRefreshToken } from "./useRefreshToken";
import { useSelector } from "react-redux";

 const useAxiosprivate = () => {
    const refresh = useRefreshToken();
    const {currentUser} = useSelector((state) => state.user);
   useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
        config => {  
        if (!config.headers['Authorization']) {
            config.headers['Authorization'] = `Bearer ${currentUser?.accessToken}`;
        }
            return config; 
        }, (error) => {
            console.error("Request Intercept Error:", error);
            return Promise.reject(error)
        }
    );
    const responseIntercept = axiosPrivate.interceptors.response.use(
        response => {
            return response;
        },
        async (error) => {
            const prevRequest = error?.config;
            if (error?.response?.status === 403 && !prevRequest?.sent) {
                prevRequest.sent = true;
                try {
                    const newAccessToken = await refresh();
                    prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    return axiosPrivate(prevRequest); 
                } catch (refreshError) {
                    return Promise.reject(refreshError);                     
                }
            }
            return Promise.reject(error);
        }
    );

    return () => {
        axiosPrivate.interceptors.request.eject(requestIntercept);
        axiosPrivate.interceptors.response.eject(responseIntercept);
    }
}, [currentUser, refresh])

return axiosPrivate;
}


export default useAxiosprivate