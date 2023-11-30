import { useQuery } from 'react-query';
import { AxiosInstance } from 'axios';
import { emailCheck } from '../types';
import { useAxios } from '../utils';


const getEmailCheck = async (axiosBase: AxiosInstance, email: string): Promise<emailCheck> => {
  try {
    const response = await axiosBase.get(`/api/account/check-email?email=${email}`);
    return response.data;
  } catch (error) {
    if (error.response) {
      const errorMessage = error.response.data.message;
      throw new Error(errorMessage);
    } else {
      throw new Error('서버 요청 중 오류가 발생했습니다.');
    }
  }
};

export function useGetEmailCheck(email: string){
  const { axiosBase } = useAxios();
  return useQuery<emailCheck, Error>(
    ['emailCheck', email],
    ({ queryKey }) => getEmailCheck(axiosBase, queryKey[1] as string),
    {
      retry: false,
      enabled: false,
    }
  );
};
