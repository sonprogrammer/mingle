import axios from 'axios';
import { useMutation } from 'react-query';
import { useSetRecoilState } from 'recoil';
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
    return useMutation(() => postRefreshToken(refreshToken), {
        onSuccess: (response) => {
        setLogin({
            isLogin: true,
            accessToken: response.accessToken,
            accessExpiredDate: response.accessExpiredDate,
        })
    }});
}