import { useQuery } from 'react-query';
import { useAxios } from "../utils";
import { AxiosInstance } from "axios";


const GetWeatherPlaylist = async(axiosInstance: AxiosInstance, weatherId: string) =>{
    const response = await axiosInstance.get(`/playlist/weather/${weatherId}`)
    return response.data
}

export const useGetWeatherPlaylist = (weatherId: string) => {
    const axiosInstance = useAxios(); 

    return useQuery(['weatherPlaylist', weatherId], () => GetWeatherPlaylist(axiosInstance, weatherId));
};
