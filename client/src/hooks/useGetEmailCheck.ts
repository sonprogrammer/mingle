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

        setErrorMessage(response.data.message);
        setImailExist(false);

        // if (response.data) {
        //   setImailExist(true);
        //   setErrorMessage(response.data.message);
        // }
      } catch (error) {
        if (error.response) {
          console.error('Response error:', error);
          setErrorMessage(error.response.data.message);
          setImailExist(true);
        } else {
          setErrorMessage('서버 오류가 발생했습니다.');
        }
      }
    };

    fetchData();
  }, [email]);
  return { isEmailExist, errorMessage };
}
