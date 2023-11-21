import axios from 'axios';
import { useMutation } from 'react-query';
import { Auth, Token } from '../types';

const postLogin = async (auth: Auth): Promise<Token> => {
	const response = await axios.post(
		'/api/account/login', auth
	);
	return response.data;
};
export function usePostLogin(auth: Auth) {
    return useMutation(() => postLogin(auth), {
        onSuccess: (response) => {
        console.log(response);
    }});
}