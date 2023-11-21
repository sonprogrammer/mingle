import Axios, { AxiosHeaders } from "axios";
import { usePostRefreshToken } from "../hooks/usePostRefreshToken";
import { getCookieToken } from "./cookie";

export const useAxios = (token: string, expiredDate: number) => {
    const today = new Date().getDate();
    const refreshToken = getCookieToken();
    const { mutate } = usePostRefreshToken(refreshToken);
    const axios = Axios.create({
        headers: {
            'Content-Type': 'application/json',
        },
    });
    axios.interceptors.request.use((config) => {
        if (token) {
            (config.headers as AxiosHeaders).set('Authorization', `Bearer ${token}`);
        }
        else if(expiredDate <= today)
        {
            mutate();
            (config.headers as AxiosHeaders).set('Authorization', `Bearer ${token}`);
        }
        return config;
    });
    axios.interceptors.response.use(
        (response) => {
            return response.data;
        },
        (error) => {
            return Promise.reject(error);
        }
    );
    return axios;
}
