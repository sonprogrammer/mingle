import { useMutation } from 'react-query';
import axios from 'axios';
import { User } from '../types';

export function usePostPassword() {
  return useMutation<string, Error, Pick<User, 'userEmail' | 'userNickname'>>(
    async (userData) => {
      const response = await axios.post(
        '/api/account/reset-password',
        userData,
      );
      return response.data.message;
    },
  );
}
