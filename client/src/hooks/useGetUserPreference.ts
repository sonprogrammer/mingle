import { useQuery } from 'react-query';
import { AxiosInstance } from "axios";
import { useAxios } from '../utils';
import { UserInfo } from '../types';


const getuserPreference = async(axiosInstance: AxiosInstance): Promise<UserInfo> =>{
    const response = await axiosInstance.get(`/api/playlist/recommend`)
    return response.data
}

export function useGetUserPreference(){
    const axiosInstance = useAxios()
    return useQuery(['get-user-preference'], () => getuserPreference(axiosInstance))
}



