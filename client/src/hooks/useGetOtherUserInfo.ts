import { AxiosInstance } from 'axios';
import { useQuery } from 'react-query';
import { Playlists, User } from '../types';
import { useAxios } from '../utils';

const getOtherUserInfo = async (axiosInstance: AxiosInstance, userId: string): Promise<{playListInfo: Playlists[], user: User}> => {
  const response = await axiosInstance.get(`/api/account/${userId}`);
  return response.data;
};
export function useGetOtherUserInfo(userId: string) {
  const { axiosInstance } = useAxios();
  return useQuery(['get-other-user-info', userId], ({ queryKey }) => getOtherUserInfo(axiosInstance, queryKey[1]));
}
