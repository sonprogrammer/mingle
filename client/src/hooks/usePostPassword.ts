import { useMutation } from 'react-query';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { User } from '../types';

async function postPassword({
  userEmail,
  userNickname,
}: Pick<User, 'userEmail' | 'userNickname'>) {
  const response = await axios.post('/api/account/reset-password', {
    userEmail,
    userNickname,
  });
  return response.data;
}

export function usePostPassword() {
  const navigate = useNavigate();

  return useMutation<string, Error, Pick<User, 'userEmail' | 'userNickname'>>(
    postPassword,
    {
      onSuccess: () => {
        navigate('/completerecoverypw');
      },
      onError: () => {
        alert('이메일 또는 닉네임이 일치하지 않습니다.');
      },
    },
  );
}
