import axios from 'axios';
import { useMutation } from 'react-query';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { loginState } from '../utils';

const postRefreshToken = async (refreshToken: string): Promise<{accessToken: string}> => { 
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
    const today = new Date();
    return useMutation(() => postRefreshToken(refreshToken), {
        onSuccess: (response) => {
        setLogin({
            isLogin: login.isLogin,
            accessToken: response.accessToken,
            expireTime: today.getDate() + 1,
        })
    }});
}