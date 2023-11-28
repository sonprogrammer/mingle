import { useQuery } from 'react-query';
import { useAxios } from '../utils';
import { AxiosInstance } from 'axios';

const getSongUploader = async (axios: AxiosInstance, userId: string) => {
  const { data } = await axios.get(`/api/song/${userId}`);
  if (!data.song.songUploader) {
    console.log('songUploader is null');
    return null;
  }
  console.log(data);
  console.log(data.song.songUploader);
  return data.song.songUploader;
};

export function useGetSongUploader(userId: string) {
  const axios = useAxios();
  return useQuery(
    ['songUploader', userId],
    () => getSongUploader(axios, userId),
    {
      retry: 1,
    },
  );
}
