import { AxiosInstance } from 'axios';
import { useQuery } from 'react-query';
import { useAxios } from '../utils/';

const fetchUploadedSongs = async (
  axiosInstance: AxiosInstance,
  page: number,
  pageSize: number,
) => {
  const response = await axiosInstance.get(
    `/api/songs/user-uploaded?page=${page}&pageSize=${pageSize}`,
  );
  return response.data;
};

export function useGetUploadedSongs(page: number, pageSize: number) {
  const { axiosInstance } = useAxios();
  return useQuery(['userUploadedSongs', page, pageSize], () =>
    fetchUploadedSongs(axiosInstance, page, pageSize),
  );
}
