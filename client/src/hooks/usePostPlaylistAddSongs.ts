import axios, { AxiosInstance } from 'axios';
import { useMutation } from 'react-query';
import { useAxios } from '../utils';
import { Dispatch, SetStateAction } from 'react';

interface PlayListAddSongData {
  _id: string[];
}

const addSongs = async (
  playListId: string,
  songData: PlayListAddSongData,
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
  setIsModalAppear: Dispatch<SetStateAction<boolean>>,
  setSongs: Dispatch<SetStateAction<PlayListAddSongData[]>>,
) {
  const axiosInstance = useAxios();
  return useMutation(
    (songData: PlayListAddSongData) => {
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
