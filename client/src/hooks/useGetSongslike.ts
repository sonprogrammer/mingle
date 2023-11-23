import { getCookieToken } from '../utils/cookie';
import { useQuery } from 'react-query';
import axios, { AxiosError } from 'axios';

async function refreshToken() {
  const refreshToken = getCookieToken();

  const tokenResponse = await fetch(
    'http://localhost:3000/api/account/refresh',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refreshToken }),
    },
  );

  if (!tokenResponse.ok) {
    throw new Error('Error refreshing access token');
  }

  return await tokenResponse.json();
}

function isTokenExpired() {
  const expiryTime = getTokenExpiry();
  return !expiryTime || expiryTime <= Date.now();
}
//토큰 만료시간을 추출해 내는 함수임
function getTokenExpiry() {
  const token = getCookieToken();

  if (!token) {
    return null;
  }

  try {
    const payload = token.split('.')[1]; // JWT의 payload를 추출하고
    const decoded = JSON.parse(atob(payload)); // Base64 디코딩을 수행한다음
    return decoded.exp ? decoded.exp * 1000 : null; // exp 값이 있으면 밀리초로 변환하여 반환함
  } catch (e) {
    console.error('Error decoding token:', e);
    return null;
  }
}

async function getSongsByLikes() {
  let accessToken = getCookieToken();

  if (isTokenExpired()) {
    const tokenData = await refreshToken();
    accessToken = tokenData.accessToken;
  }

  const response = await axios.get(
    'http://localhost:3000/api/songs?orderby=top',
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  if (response.status !== 200) {
    throw new Error(`Error fetching songs: ${response.statusText}`);
  }

  return response.data;
}

export function useGetSongslike() {
  return useQuery('songsByLikes', getSongsByLikes, {
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
