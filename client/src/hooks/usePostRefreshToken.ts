import axios from 'axios';
import { useMutation } from 'react-query';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { loginState } from '../utils';

const postRefreshToken = async (refreshToken: string): Promise<string> => { 
	const response = await axios.post(
		'/api/refresh', refreshToken
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
            accessToken: response,
            expireTime: today.setDate(today.getDate() + 1),
        })
        console.log("토큰이 재발급 되었습니다");
    }});
}