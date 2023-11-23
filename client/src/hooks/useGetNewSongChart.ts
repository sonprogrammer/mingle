import { useQuery } from 'react-query';
import axios, { AxiosError } from 'axios';
import { getCookieToken } from '../utils/cookie';

async function refreshToken() {
  const refreshToken = getCookieToken();

  try {
    const tokenResponse = await axios.post(
      'api/account/refresh',
      { refreshToken },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    return tokenResponse.data;
  } catch (error) {
    throw new Error('Error refreshing access token');
  }
}

function isTokenExpired() {
  const expiryTime = getTokenExpiry();
  return !expiryTime || expiryTime <= Date.now();
}

function getTokenExpiry() {
  const token = getCookieToken();

  if (!token) {
    return null;
  }

  try {
    const payload = token.split('.')[1];
    const decoded = JSON.parse(atob(payload));
    return decoded.exp ? decoded.exp * 1000 : null;
  } catch (e) {
    console.error('Error decoding token:', e);
    return null;
  }
}

async function getSongsByRecent() {
  let accessToken = getCookieToken();

  if (isTokenExpired()) {
    const tokenData = await refreshToken();
    accessToken = tokenData.accessToken;
  }

  try {
    const response = await axios.get(
      'api/songs?orderby=recent',
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    return response.data;
  } catch (error) {
    throw new Error(`Error fetching songs: ${error.response?.statusText}`);
  }
}

export function useGetNewSongChart() {
  return useQuery('songsByRecent', getSongsByRecent, {
    onSuccess: (data) => {
      console.log('Data fetched successfully:', data);
    },
    onError: (error: unknown) => {
      if (error instanceof AxiosError) {
        console.error(`Error fetching songs: ${error.response?.statusText}`);
      } else {
        console.error('An unknown error occurred');
      }
    },
  });
}
