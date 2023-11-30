import { AxiosInstance } from 'axios';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { User } from '../types';
import { useAxios } from '../utils';

async function postPassword(axiosBase: AxiosInstance, {
  userEmail,
  userNickname,
}: Pick<User, 'userEmail' | 'userNickname'>) {
  const response = await axiosBase.post('/api/account/reset-password', {
    userEmail,
    userNickname,
  });
  return response.data;
}

export function usePostPassword(userEmail: string, userNickname: string) {
  const navigate = useNavigate();
  const { axiosBase } = useAxios();
  return useMutation<string, Error, Pick<User, 'userEmail' | 'userNickname'>>(
    () => postPassword(axiosBase, { userEmail, userNickname }),
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
