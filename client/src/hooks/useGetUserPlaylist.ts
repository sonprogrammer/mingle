import { useQuery } from 'react-query';
import { useAxios } from '../utils';
import { AxiosInstance, AxiosResponse } from 'axios';

export function useGetUserPlaylist() {
  const axiosInstance = useAxios();

  const { data, error, isLoading } = useQuery('user-playlist', async () => {
    try {
      const response: AxiosResponse = await axiosInstance.get('/api/playlist');
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch user playlist');
    }
  });

  return { data, error, isLoading };
}
