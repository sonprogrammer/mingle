
import { useQuery } from 'react-query';
import { useAxios } from '../utils';
import { AxiosInstance } from 'axios';


const getRecommendUser = async( axiosInstance: AxiosInstance) => {
    const response = await axiosInstance.get(`/api/account/user-recommend`)
    return response.data
}

export function useGetRecommendUser(){
    const axiosInstance = useAxios();
    return useQuery(['get-recommend-user'], () => getRecommendUser(axiosInstance))
}