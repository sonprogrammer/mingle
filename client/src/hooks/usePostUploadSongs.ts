import axios, { AxiosInstance } from 'axios';
import { useMutation } from 'react-query';
import { useAxios } from '../utils';
interface SongData {
  audio: File;
  image: File;
  name: string;
  description: string;
  duration: string;
  genre: string;
}

const uploadSong = async (formData: FormData, axiosInstance: AxiosInstance) => {
  const response = await axiosInstance.post('/api/song', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};
export function usePostUploadSongs() {
  const axiosInstance = useAxios();
  return useMutation(
    (songData: SongData) => {
      const formData = new FormData();
      formData.append('audio', songData.audio);
      formData.append('songImage', songData.image);
      formData.append('songName', songData.name);
      formData.append('songDescription', songData.description);
      formData.append('songDuration', songData.duration);
      formData.append('songCategory', songData.genre);

      return uploadSong(formData, axiosInstance);
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
          alert('업로드에 실패하였습니다.');
        } else {
          console.error('Error:', error);
          alert('업로드에 실패하였습나다.');
        }
      },
    },
  );
}
