import { AxiosInstance } from 'axios';
import { useQuery } from 'react-query';
import { Songs } from '../types';
import { useAxios } from '../utils';


const getNewSong = (axiosInstance: AxiosInstance) =>{
  const response = axiosInstance.get('/api/songs?orderby=recent');
  return response
}


export function useGetNewSongChart(){
  const axiosInstance = useAxios();
  return useQuery<Songs, Error>('newSongChart', () => getNewSong(axiosInstance))
}