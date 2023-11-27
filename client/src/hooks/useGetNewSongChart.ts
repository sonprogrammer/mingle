import { AxiosInstance } from 'axios';
import { useQuery } from 'react-query';
import { Songs } from '../types';
import { useAxios } from '../utils';


const getNewSong = async(axiosInstance: AxiosInstance) =>{
  const response  = await axiosInstance.get('/api/songs?orderby=recent');
  return response.data
}


export function useGetNewSongChart(){
  const axiosInstance = useAxios();
  return useQuery<Songs, Error>('newSongChart', () => getNewSong(axiosInstance))
}