import { useQuery } from 'react-query';
import { useAxios } from '../utils';
import { AxiosInstance } from 'axios';

const getSongUploader = async (axiosInstance: AxiosInstance, songId: string) => {
  const { data } = await axiosInstance.get(`/api/song/${songId}`);
  if (!data.song.songUploader) {
    return null;
  }
  return data.song.songUploader;
};

export function useGetSongUploader(songId: string) {
  const { axiosInstance } = useAxios();
  return useQuery(
    ['songUploader', songId],
    () => getSongUploader(axiosInstance, songId),
    {
      retry: 1,
    },
  );
}
