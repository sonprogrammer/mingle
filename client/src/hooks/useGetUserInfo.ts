import { AxiosInstance } from 'axios';
import { useQuery } from 'react-query';
import { UserInfo } from '../types';
import { useAxios } from '../utils';

const getUserInfo = async (axiosInstance: AxiosInstance): Promise<UserInfo> => {
  const response = await axiosInstance.get('/api/account');
  return response.data;
};
export function useGetUserInfo() {
  const axiosInstance = useAxios();
  return useQuery(['get-user-info'], () => getUserInfo(axiosInstance));
}
