import { useMutation } from 'react-query';
import { Auth, Token } from '../types';
import { useSetRecoilState } from 'recoil';
import { setRefreshToken, loginState, useAxios } from '../utils';
import { useNavigate } from 'react-router-dom';
import { AxiosInstance } from 'axios';

const postLogin = async (axiosBase: AxiosInstance, auth: Auth): Promise<Token> => { 
	const response = await axiosBase.post(
		'/api/account/login', auth
	);
	return response.data;
};

export function usePostLogin(auth: Auth) {
    const { axiosBase } = useAxios();
    const setLogin = useSetRecoilState(loginState);
    const navigate = useNavigate();
    return useMutation(() => postLogin(axiosBase, auth), {
        onSuccess: (response) => {
            setLogin({
                isLogin: true,
                accessToken: response.accessToken,
                accessExpiredDate: response.accessExpiredDate,
            });
            setRefreshToken(response.refreshToken, response.refreshExpiredDate);
            navigate('/');
        },
        onError: () => {
            alert("아이디 또는 비밀번호가 올바르지 않습니다.");
        }
});
}