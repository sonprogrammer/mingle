import { useQuery } from 'react-query';
import { useAxios } from '../utils';
import { AxiosInstance } from 'axios';

const getSongDetails = async (axios: AxiosInstance, songId: string) => {
  const { data } = await axios.get(`/api/song/${songId}`);
  return data;
};

export function useGetSongDetails(songId: string) {
  const axios = useAxios();
  return useQuery(
    ['song', songId],
    async () => {
      try {
        return await getSongDetails(axios, songId);
      } catch (error) {
        alert('곡을 불러오는데 실패하였습니다.');
        throw error;
      }
    },
    {
      retry: 1,
    },
  );
}
