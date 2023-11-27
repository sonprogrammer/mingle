import { useQuery } from 'react-query';
import { useAxios } from '../utils';
import { AxiosInstance } from 'axios';

const fetchSong = async (axios: AxiosInstance, songId: string) => {
  const { data } = await axios.get(`/api/song/${songId}`);
  return data;
};

export function useGetSongDetails(songId: string) {
  const axios = useAxios();

  return useQuery(['song', songId], () => fetchSong(axios, songId));
}
