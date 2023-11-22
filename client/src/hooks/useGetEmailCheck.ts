// import { useQuery } from 'react-query';
import axios from 'axios';
import { emailCheck } from '../types';
import { useEffect, useState } from 'react';

export function useGetEmailCheck(email: string): emailCheck {
  const [isEmailExist, setImailExist] = useState(false);
  const [errorMessage, setErrorMessage] = useState('error');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `/api/account/check-email?email=${email}`,
        );
        console.log('Response:', response.data.message);

        setImailExist(false);
        setErrorMessage('')

        if (
          response.data &&
          response.data.message === '이미 존재하는 사용자입니다.'
        ) {
          setImailExist(true);
          setErrorMessage(response.data.message);
        }
      } catch (error) {
        if (error.response) {
          console.error('Response error:', error);
          setErrorMessage(
            error.response.data.message || '서버 오류가 발생했습니다.',
          );
        } else {
          setErrorMessage('서버 오류가 발생했습니다.');
        }
      }
    };

    fetchData();
  }, [email]);
  return { isEmailExist, errorMessage };
}
