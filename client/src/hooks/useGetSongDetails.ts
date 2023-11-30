import { useState } from 'react';
import { useQuery } from 'react-query';
import { useAxios } from '../utils';
import { AxiosInstance } from 'axios';

const getSongDetails = async (axiosInstance: AxiosInstance, songId: string) => {
  const { data } = await axiosInstance.get(`/api/song/${songId}`);
  return data;
};

export function useGetSongDetails(songId: string) {
  const { axiosInstance } = useAxios();
  const [errorOccurred, setErrorOccurred] = useState(false);
  return useQuery(
    ['song', songId],
    async () => {
      try {
        return await getSongDetails(axiosInstance, songId);
      } catch (error) {
        if (!errorOccurred) {
          setErrorOccurred(true);
          alert('곡을 불러오는데 실패하였습니다.');
        }
        throw error;
      }
    },
    {
      retry: 1,
    },
  );
}
