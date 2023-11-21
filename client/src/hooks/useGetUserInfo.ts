import { AxiosInstance } from 'axios';
import { useQuery } from 'react-query';
import { useRecoilValue } from 'recoil';
import { UserInfo } from '../types';
import { loginState, useAxios } from '../utils';

const getUserInfo = async (axiosInstance: AxiosInstance): Promise<UserInfo> => {
	const response = await axiosInstance.get(		
        '/api/account'
	);
	return response.data;
};
export function useGetUserInfo() {
    const accessToken = useRecoilValue<{accessToken: string, expireTime: number}>(loginState);
    const axiosInstance = useAxios(accessToken.accessToken, accessToken.expireTime);
	return useQuery(["get-user-info"], () => getUserInfo(axiosInstance));
}