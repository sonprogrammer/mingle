import { useQuery } from 'react-query';
import { useAxios } from '../utils';
import { AxiosInstance } from 'axios';

const getSongUploader = async (axios: AxiosInstance, songId: string) => {
  const { data } = await axios.get(`/api/song/${songId}`);
  if (!data.song.songUploader) {
    console.log('songUploader is null');
    return null;
  }
  return data.song.songUploader;
};

export function useGetSongUploader(songId: string) {
  const axios = useAxios();
  return useQuery(
    ['songUploader', songId],
    () => getSongUploader(axios, songId),
    {
      retry: 1,
    },
  );
}
