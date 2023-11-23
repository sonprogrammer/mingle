import { useQuery } from 'react-query';
import axios from 'axios';
import { emailCheck } from '../types';
import { boolean } from 'joi';


const getEmailCheck = async (email: string): Promise<emailCheck> => {
  try {
    const response = await axios.get(`/api/account/check-email?email=${email}`);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message);
    } else {
      console.error('Error:', error);
      throw new Error('서버 요청 중 오류가 발생했습니다.');
    }
  }
};

export function useGetEmailCheck(email: string, isButtonClicked: boolean){
  return useQuery<emailCheck, Error>(
    ['emailCheck', email, isButtonClicked],
    () => getEmailCheck(email),
    {
      retry: false,
      enabled: false,
      onSuccess: (response) => {
        console.log('Success:', response);
      },
      onError: (error: Error) => {
        console.error('Error:', error);
      }

    }
  );
};
