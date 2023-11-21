import axios from 'axios';
import { useMutation } from 'react-query';
import { Auth, Token } from '../types';
import { useSetRecoilState } from 'recoil';
import { setRefreshToken, tokenState } from '../utils';
import { useNavigate } from 'react-router-dom';

const postLogin = async (auth: Auth): Promise<Token> => { 
	const response = await axios.post(
		'/api/account/login', auth
	);
	return response.data;
};
export function usePostLogin(auth: Auth) {
    const setToken = useSetRecoilState(tokenState);
    const navigate = useNavigate();
    return useMutation(() => postLogin(auth), {
        onSuccess: (response) => {
        setToken(response.accessToken);
        setRefreshToken(response.refreshToken);
        navigate('/');
    }});
}