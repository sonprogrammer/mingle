import { useMutation } from 'react-query';
import { useAxios } from '../utils';
import { AxiosInstance } from 'axios';

const PostFollowUser = async (userId: string, axiosInstance: AxiosInstance) => {
  const response = await axiosInstance.post(
    `/api/account/follow/${userId}`,
    {},
  );
  return response.data;
};

export function usePostUserFollow() {
  const axiosInstance = useAxios();

  const mutation = useMutation((userId: string) =>
    PostFollowUser(userId, axiosInstance),
  );

  return mutation;
}
