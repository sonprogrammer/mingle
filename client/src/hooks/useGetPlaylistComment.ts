import { useAxios } from '../utils';
import { AxiosInstance } from 'axios';
import { useQuery } from 'react-query';

const getPlaylistComment = async (
  playlistId: string,
  axiosInstance: AxiosInstance,
) => {
  const response = await axiosInstance.get(
    `/api/playlist/playlistComment/${playlistId}`,
  );
  return response.data;
};

export function useGetPlaylistComment(playlistId: string) {
  const { axiosInstance } = useAxios();
  return useQuery(['playlistComment', playlistId], () =>
    getPlaylistComment(playlistId, axiosInstance),
  );
}
