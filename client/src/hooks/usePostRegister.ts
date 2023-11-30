import { AxiosInstance } from 'axios';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { User } from '../types';
import { useAxios } from '../utils';

const postRegister = async (axiosBase: AxiosInstance, user: User): Promise<string> => {
	const response = await axiosBase.post(
		'/api/account', user
	);
	return response.data;
};
export function usePostRegister(user: User) {
    const navigate = useNavigate();
    const { axiosBase } = useAxios();
    return useMutation(() => postRegister(axiosBase, user), {
        onSuccess: () => {
        alert("회원가입이 완료되었습니다.");
        navigate('/');
    },
        onError: (e) => {
        console.log(`error: ${e}`);
    },
});
}