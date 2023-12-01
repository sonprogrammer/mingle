import { AxiosInstance } from 'axios';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { useAxios } from '../utils';

const postRegister = async (
  axiosBase: AxiosInstance,
  userEmail: string,
  userPassword: string,
  userNickname: string,
  userPreference: string[],
): Promise<string> => {
  const response = await axiosBase.post('/api/account',       
 { userEmail,
  userPassword,
  userNickname,
  userPreference});
  return response.data;
};
export function usePostRegister(
  userEmail: string,
  userPassword: string,
  userNickname: string,
  userPreference: string[],
) {
  const navigate = useNavigate();
  const { axiosBase } = useAxios();
  return useMutation(
    () =>
      postRegister(
        axiosBase,
        userEmail,
        userPassword,
        userNickname,
        userPreference,
      ),
    {
      onSuccess: () => {
        alert('회원가입이 완료되었습니다.');
        navigate('/');
      },
      onError: (e) => {
        console.log(`error: ${e}`);
      },
    },
  );
}
