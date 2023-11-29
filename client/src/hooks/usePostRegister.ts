import axios from 'axios';
import { useMutation } from 'react-query';
import { User } from '../types';

const postRegister = async (user: User): Promise<string> => {
	const response = await axios.post(
		'/api/account', user
	);
	return response.data;
};
export function usePostRegister(user: User) {
    return useMutation(() => postRegister(user), {
        onSuccess: (response) => {
        console.log(response);
    }});
}