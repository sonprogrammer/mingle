import { AxiosInstance } from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { UserInfo } from '../types';
import { useAxios } from '../utils';

const putUserDescription = async (
  axiosInstance: AxiosInstance,
  updatedInfo: Partial<UserInfo>,
): Promise<UserInfo> => {
    const response = await axiosInstance.put('api/account/description', updatedInfo);
    return response.data;
};


export function usePutUserDescription() {
  const { axiosInstance } = useAxios();
  const queryClient = useQueryClient();
  
  

  return useMutation(
    (updatedInfo: Partial<UserInfo>) =>
      putUserDescription(axiosInstance, updatedInfo),
    {
      onSuccess: (update) => {
        queryClient.invalidateQueries('userDescription')
      },
      onError: (error)=>{
        throw error
      }
    },
  );
}
