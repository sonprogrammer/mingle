import axios, { AxiosInstance } from 'axios';
import { useMutation } from 'react-query';
import { useAxios } from '../utils';
import { atom } from 'recoil';

interface PlayListData {
  playListTitle: string;
  playListExplain: string;
  playListSongs: SongData[]; // SongData는 곡의 정보를 담는 타입으로 정의해야 함
  playListImg: string;
  genre: string;
}

interface SongData {
  _id: string;
}

const uploadPlayList = async (
  playListData: PlayListData,
  axiosInstance: AxiosInstance,
) => {
  const response = await axiosInstance.post('/api/playlist', playListData, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};

export const uploadedPlayListState = atom<PlayListData[]>({
  key: 'uploadedPlayListState',
  default: [],
});

export function usePostUploadPlayList(
  setIsModalAppear: (value: boolean) => void,
  setSongs: (value: string[]) => void,
) {
  const axiosInstance = useAxios();
  return useMutation(
    (playListData: PlayListData) => {
      return uploadPlayList(playListData, axiosInstance);
    },
    {
      onSuccess: () => {
        alert('플레이리스트 업로드에 성공하였습니다.');
        setIsModalAppear(false);
        setSongs([]);
      },
      onError: (error) => {
        if (axios.isAxiosError(error)) {
          alert('플레이리스트 업로드에 실패하였습니다.');
        } else {
          alert('플레이리스트 업로드에 실패하였습나다.');
        }
      },
    },
  );
}
