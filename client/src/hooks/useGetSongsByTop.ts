import { AxiosInstance } from 'axios';
import { useQuery } from 'react-query';
import { useAxios } from '../utils';

export function useGetSongsByTop() {
  const axios: AxiosInstance = useAxios();

  return useQuery('userUploadedSongs', async () => {
    const res = await axios.get(`/api/songs?orderby=top`);
    return res;
  });
}
