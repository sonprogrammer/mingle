import { AxiosResponse, AxiosInstance } from 'axios';
import { useQuery } from 'react-query';
import { useAxios } from '../utils';

export function useGetSongslike() {
  const axios: AxiosInstance = useAxios();

  return useQuery('userUploadedSongs', () =>
    axios.get(`/api/songs?orderby=top`).then((res: AxiosResponse) => {
      console.log(res);
      return res.data;
    }),
  );
}
