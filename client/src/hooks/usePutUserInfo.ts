import { AxiosInstance } from 'axios';
import { useMutation } from 'react-query';
import { UserInfo } from '../types';
import { useAxios } from '../utils';




const putUserInfo = async (
  axiosInstance: AxiosInstance,
  updatedInfo: Partial<UserInfo>,
): Promise<UserInfo> => {
    const response = await axiosInstance.put(`/api/account/`, updatedInfo);
    return response.data;

};

export function usePutUserInfo() {
  const axiosInstance = useAxios();
  return useMutation(
    (updatedInfo: Partial<UserInfo>) => putUserInfo(axiosInstance, updatedInfo),
    {
      onSuccess: (data) => {
      },
      onError: (error)=>{
        throw error
      }
    },
  );
}
