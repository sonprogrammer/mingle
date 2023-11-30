import { useQuery } from 'react-query';
import { useAxios } from '../utils';

export function useGetSongsByTop() {
  const { axiosInstance } = useAxios();

  return useQuery('userUploadedSongs', async () => {
    const res = await axiosInstance.get(`/api/songs?orderby=top`);
    return res;
  });
}
