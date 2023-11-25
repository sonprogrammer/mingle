import { useQuery } from 'react-query';
import axios from 'axios';
import { emailCheck } from '../types';


const getEmailCheck = async (email: string): Promise<emailCheck> => {
  try {
    const response = await axios.get(`/api/account/check-email?email=${email}`);
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
  return useQuery<emailCheck, Error>(
    ['emailCheck', email],
    ({ queryKey }) => getEmailCheck(queryKey[1] as string),
    {
      retry: false,
      enabled: false,
    }
  );
};
