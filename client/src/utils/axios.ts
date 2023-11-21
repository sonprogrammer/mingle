import Axios, { AxiosHeaders } from "axios";

export const axios = (token: string) => {
    const axios = Axios.create({
        headers: {
            'Content-Type': 'application/json',
        },
    });
    axios.interceptors.request.use((config) => {
        if (token) {
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
