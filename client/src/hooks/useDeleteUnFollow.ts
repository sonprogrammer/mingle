import { useMutation } from 'react-query';
import { useAxios } from '../utils';
import { AxiosInstance } from 'axios';

const unfollowUser = async (userId: string, axiosInstance: AxiosInstance) => {
  const response = await axiosInstance.delete(`/api/account/follow/${userId}`);
  return response.data;
};

export function useDeleteUnFollow() {
  const axiosInstance = useAxios();

  const mutation = useMutation((userId: string) =>
    unfollowUser(userId, axiosInstance),
  );

  return mutation;
}
