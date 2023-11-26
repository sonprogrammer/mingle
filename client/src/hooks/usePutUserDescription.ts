import { AxiosInstance } from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { UserInfo } from '../types';
import { useAxios } from '../utils';

const putUserDescription = async (
  axiosInstance: AxiosInstance,
  updatedInfo: Partial<UserInfo>,
): Promise<UserInfo> => {
  try {
    const response = await axiosInstance.put('api/account/description', updatedInfo);
    console.log('Response from server:', response);
    return response.data;
  } catch (error) {
    console.error('Error updating user description:', error);
    throw error;
  }
};


export function usePutUserDescription() {
  const axiosInstance = useAxios();
  const queryClient = useQueryClient();
  
  

  return useMutation(
    (updatedInfo: Partial<UserInfo>) =>
      putUserDescription(axiosInstance, updatedInfo),
    {
      onSuccess: (update) => {
        console.log('User description updated : ', update);
        queryClient.invalidateQueries('userDescription')
      },
    },
  );
}
