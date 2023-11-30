import axios, { AxiosInstance } from 'axios';
import { useMutation } from 'react-query';
import { useAxios } from '../utils';
import { atom } from 'recoil';
interface SongData {
  audio: File;
  image: File;
  name: string;
  artist: string;
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

export const uploadedSongsState = atom<SongData[]>({
  key: 'uploadedSongsState',
  default: [],
});
export function usePostUploadSongs(onClose: () => void) {
  const { axiosInstance } = useAxios();
  return useMutation(
    (songData: SongData) => {
      const formData = new FormData();
      formData.append('audio', songData.audio);
      formData.append('songImage', songData.image);
      formData.append('songName', songData.name);
      formData.append('songArtist', songData.artist);
      formData.append('songDescription', songData.description);
      formData.append('songDuration', songData.duration);
      formData.append('songCategory', songData.genre);

      return uploadSong(formData, axiosInstance);
    },
    {
      onSuccess: () => {
        onClose();
        alert('업로드에 성공하였습니다.');
      },
      onError: (error) => {
        if (axios.isAxiosError(error)) {
          const message = error.response?.data?.message || error.message;
          alert(`업로드에 실패하였습니다:.${message} `);
        } else {
          alert(`업로드에 실패하였습니다:.${error} `);
        }
      },
    },
  );
}
