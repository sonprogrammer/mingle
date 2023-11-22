import axios from 'axios';
import { useMutation } from 'react-query';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { loginState } from '../utils';

const postRefreshToken = async (refreshToken: string): Promise<{
    accessToken: string,
    accessExpiredDate: Date,
}> => { 
	const response = await axios.post(
		'/api/account/refresh', {
            refreshToken: refreshToken
        },
	);
	return response.data;
};
export function usePostRefreshToken(refreshToken: string) {
    const setLogin = useSetRecoilState(loginState);
    const login = useRecoilValue(loginState);
    return useMutation(() => postRefreshToken(refreshToken), {
        onSuccess: (response) => {
        setLogin({
            isLogin: login.isLogin,
            accessToken: response.accessToken,
            accessExpiredDate: response.accessExpiredDate,
        })
    }});
}