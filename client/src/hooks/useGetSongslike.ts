import { getCookieToken } from '../utils/cookie';
import { useQuery } from 'react-query';

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

export function useGetSongslike() {
  return useQuery('songsByLikes', async () => {
    let accessToken = getCookieToken();

    if (isTokenExpired()) {
      const tokenData = await refreshToken();
      accessToken = tokenData.accessToken;
    }

    const response = await fetch(
      'http://localhost:3000/api/songs?orderby=top',
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    if (!response.ok) {
      throw new Error(`Error fetching songs: ${response.statusText}`);
    }

    return response.json();
  });
}
