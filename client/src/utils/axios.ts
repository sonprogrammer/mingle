import Axios, { AxiosHeaders } from "axios";
import { usePostRefreshToken } from "../hooks/usePostRefreshToken";
import { getCookieToken } from "./cookie";
import { useRecoilValue } from "recoil";
import { loginState } from "./state";

export const useAxios = () => {
    const today = new Date(Date.now());
    const { accessToken, accessExpiredDate } = useRecoilValue(loginState);
    const refreshToken = getCookieToken();
    const { mutate } = usePostRefreshToken(refreshToken);

    const axios = Axios.create({
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
        },
    });
    axios.interceptors.request.use((config) => {
        if(!accessToken && refreshToken || new Date(accessExpiredDate) <= today)
        {
            mutate();
        } // 토큰이 유실되었을 때 또는 access Token이 만료 되었을 때 재발급 로직(refresh Token은 존재함)
        (config.headers as AxiosHeaders).set('Authorization', `Bearer ${accessToken}`);
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
