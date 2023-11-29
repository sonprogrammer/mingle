import { useQuery } from 'react-query';
import { useAxios } from '../utils';
import { AxiosInstance } from 'axios';

export function useGetUserPlaylist() {
  const axiosInstance = useAxios();

  const { data, error, isLoading } = useQuery('user-playlist', async () => {
    const { data } = await axiosInstance.get('/api/playlist');
    return data;
  });
}
