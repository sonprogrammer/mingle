import { AxiosResponse, AxiosInstance } from 'axios';
import { useQuery } from 'react-query';
import { useAxios } from '../utils/';

export function useGetUploadedSongs(page: number, pageSize: number) {
  const axios: AxiosInstance = useAxios();

  return useQuery(['userUploadedSongs', page, pageSize], () =>
    axios
      .get(`/api/songs/user-uploaded?page=${page}&pageSize=${pageSize}`)
      .then((res: AxiosResponse) => res.data),
  );
}
