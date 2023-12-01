import axios, { AxiosInstance } from 'axios';
import { useMutation } from 'react-query';
import { useAxios } from '../utils';
import { Dispatch, SetStateAction } from 'react';
import {ChartSong} from "../components/ChartComponent/ChartComponent";

interface PlayListData {
  playListTitle: string;
  playListExplain: string;
  playListSongs: string[]; // SongData는 곡의 정보를 담는 타입으로 정의해야 함
  playListImg?: string;
  genre: string;
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

const modifyPlayList = async (
  playListId: string,
  playListData: PlayListData,
  axiosInstance: AxiosInstance,
) => {
  const response = await axiosInstance.put(
    `/api/playlist/${playListId}`,
    playListData,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
  console.log(response.data);
  return response.data;
};

const deletePlayList = async (
  playListId: string,
  axiosInstance: AxiosInstance,
) => {
  const response = await axiosInstance.delete(`/api/playlist/${playListId}`);
  return response.data;
};

export function usePostUploadPlayList(
  setIsModalAppear: Dispatch<SetStateAction<boolean>>,
  setIsSelectModal: Dispatch<SetStateAction<boolean | null>>,
  setIsExistingPlayList: Dispatch<SetStateAction<boolean | null>>,
  setSongs: Dispatch<SetStateAction<ChartSong[]>>,
) {
  const { axiosInstance } = useAxios();
  return useMutation(
    (playListData: PlayListData) => {
      return uploadPlayList(playListData, axiosInstance);
    },
    {
      onSuccess: () => {
        alert('플레이리스트 업로드에 성공하였습니다.');
        setIsModalAppear(false);
        setIsSelectModal(true);
        setIsExistingPlayList(null);
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

export function usePutModifyPlayList(
  playListId: string,
  setIsModalAppear: Dispatch<SetStateAction<boolean>>,
) {
  const { axiosInstance } = useAxios();
  return useMutation(
    (playListData: PlayListData) => {
      return modifyPlayList(playListId, playListData, axiosInstance);
    },
    {
      onSuccess: () => {
        alert('플레이리스트 수정에 성공하였습니다.');
        setIsModalAppear(false);
      },
      onError: (error) => {
        if (axios.isAxiosError(error)) {
          alert('플레이리스트 수정에 실패하였습니다.');
        } else {
          alert('플레이리스트 수정에 실패하였습나다.');
        }
      },
    },
  );
}

export function useDeletePlayList() {
  const { axiosInstance } = useAxios();
  return useMutation(
    (playListId: string) => {
      return deletePlayList(playListId, axiosInstance);
    },
    {
      onSuccess: () => {
        alert('플레이리스트 삭제에 성공하였습니다.');
      },
      onError: (error) => {
        if (axios.isAxiosError(error)) {
          alert('플레이리스트 삭제에 실패하였습니다.');
        } else {
          alert('플레이리스트 삭제에 실패하였습나다.');
        }
      },
    },
  );
}
