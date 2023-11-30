import axios, { AxiosInstance } from 'axios';
import { useMutation } from 'react-query';
import { useAxios } from '../utils';

interface SongData {
  _id: string[];
}

const addSongs = async (
  playListId: string,
  songData: SongData,
  axiosInstance: AxiosInstance,
) => {
  const response = await axiosInstance.post(
    `/api/playlist/${playListId}/addSong`,
    songData,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
  return response.data;
};

export function usePostPlaylistAddSongs(
  playListId: string,
  setIsModalAppear: (value: boolean) => void,
  setSongs: (value: string[]) => void,
) {
  const axiosInstance = useAxios();
  return useMutation(
    (songData: songData) => {
      return addSongs(playListId, songData, axiosInstance);
    },
    {
      onSuccess: () => {
        alert('플레이리스트 곡 추가에 성공하였습니다.');
        setIsModalAppear(false);
        setSongs([]);
      },
      onError: (error) => {
        if (axios.isAxiosError(error)) {
          alert('플레이리스트 곡 추가에 실패하였습니다.');
        } else {
          alert('플레이리스트 추가에 실패하였습나다.');
        }
      },
    },
  );
}
