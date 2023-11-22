import { getCookieToken } from './cookie';

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

function getTokenExpiry() {
  const token = getCookieToken(); // 현재 access token을 가져옵니다.

  if (!token) {
    return null;
  }

  try {
    const payload = token.split('.')[1]; // JWT의 두 번째 부분(payload)을 추출합니다.
    const decoded = JSON.parse(atob(payload)); // Base64 디코딩을 수행합니다.
    return decoded.exp ? decoded.exp * 1000 : null; // exp 값이 있다면 밀리초로 변환하여 반환합니다.
  } catch (e) {
    console.error('Error decoding token:', e);
    return null;
  }
}

export async function fetchSongsByLikes() {
  try {
    let accessToken = getCookieToken(); // 기존 access token을 가져옵니다.

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

    const songs = await response.json();
    return songs;
  } catch (error) {
    console.error('Error fetching songs by likes:', error);
    return null;
  }
}

fetchSongsByLikes().then((songs) => {
  if (songs) {
    console.log('좋아요 순으로 곡을 가져왔습니다.', songs);
  } else {
    console.log('곡을 가져오는 중 오류가 발생했습니다.');
  }
});
