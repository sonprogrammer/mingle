import axios from 'axios';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { User } from '../types';

const postRegister = async (user: User): Promise<string> => {
	const response = await axios.post(
		'/api/account', user
	);
	return response.data;
};
export function usePostRegister(user: User) {
    const navigate = useNavigate();
    return useMutation(() => postRegister(user), {
        onSuccess: () => {
        alert("회원가입이 완료되었습니다.");
        navigate('/');
    },
        onError: (e) => {
        console.log(`error: ${e}`);
    },
});
}