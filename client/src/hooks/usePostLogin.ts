import axios from 'axios';
import { useMutation } from 'react-query';
import { Auth, Token } from '../types';
import { useSetRecoilState } from 'recoil';
import { setRefreshToken, loginState } from '../utils';
import { useNavigate } from 'react-router-dom';

const postLogin = async (auth: Auth): Promise<Token> => { 
	const response = await axios.post(
		'/api/account/login', auth
	);
	return response.data;
};

export function usePostLogin(auth: Auth) {
    const setLogin = useSetRecoilState(loginState);
    const navigate = useNavigate();
    return useMutation(() => postLogin(auth), {
        onSuccess: (response) => {
            setLogin({
                isLogin: true,
                accessToken: response.accessToken,
                accessExpiredDate: response.accessExpiredDate,
            });
            setRefreshToken(response.refreshToken, response.refreshExpiredDate);
            navigate('/');
        },
        onError: (e) => {
            console.log(e);
        }
});
}