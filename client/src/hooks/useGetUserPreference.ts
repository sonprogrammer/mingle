import { useQuery } from 'react-query';
import { AxiosInstance } from 'axios';
import { useAxios } from '../utils';

const getuserPreference = async (axiosInstance: AxiosInstance) => {
  const response = await axiosInstance.get(`/api/playlist/recommend`);
  return response.data;
};

export function useGetUserPreference() {
  const { axiosInstance } = useAxios();
  return useQuery(
    ['get-user-preference'],
    () => getuserPreference(axiosInstance),
    {
      onSuccess: (data) => {
        console.log('usre data', data);
      },
    },
  );
}
