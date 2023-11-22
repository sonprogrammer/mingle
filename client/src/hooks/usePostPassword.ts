import axios, { AxiosError } from 'axios';
import { User } from '../types/User';

export async function postPassword(
  userData: Pick<User, 'userEmail' | 'userNickname'>,
): Promise<string> {
  try {
    const response = await axios.post('/api/account/reset-password', userData);
    return response.data.message;
  } catch (error) {
    if (error instanceof AxiosError) {
      const message =
        error.response?.data.message || 'Unknown Axios error occurred';
      throw new Error(message);
    } else {
      throw new Error('An unexpected error occurred');
    }
  }
}
