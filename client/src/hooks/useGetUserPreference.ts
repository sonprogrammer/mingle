import { useQuery } from 'react-query';
import { AxiosInstance } from "axios";
import { useAxios } from '../utils';
import { UserInfo } from '../types';

const getuserPreference = async(axiosInstance: AxiosInstance, userId: string): Promise<AxiosInstance<UserInfo>> =>{
    const response = await axiosInstance.get(`/playlist/preference/${userId}`)
    return response.data
}

export function useGetUserPreference(userId: string){
    const axiosInstance = useAxios()
    return useQuery(['get-user-preference'], () => getuserPreference(axiosInstance, userId))
}