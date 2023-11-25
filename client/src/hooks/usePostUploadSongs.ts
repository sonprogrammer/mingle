import axios from 'axios';
import { useMutation } from 'react-query';

interface SongData {
  audio: File;
  image: File;
  name: string;
  description: string;
  duration: string;
  genre: string;
}

const uploadSong = async (formData: FormData, token: string) => {
  const response = await axios.post('/api/song', formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export function usePostUploadSongs(token: string) {
  return useMutation(
    (songData: SongData) => {
      const formData = new FormData();
      formData.append('audio', songData.audio);
      formData.append('songImage', songData.image);
      formData.append('songName', songData.name);
      formData.append('songDescription', songData.description);
      formData.append('songDuration', songData.duration);
      formData.append('songCategory', songData.genre);

      return uploadSong(formData, token);
    },
    {
      onSuccess: (data) => {
        console.log('성공:', data);
      },
      onError: (error) => {
        if (axios.isAxiosError(error)) {
          console.error(
            'Error:',
            error.response ? error.response.data : error.message,
          );
        } else {
          console.error('Error:', error);
        }
      },
    },
  );
}
