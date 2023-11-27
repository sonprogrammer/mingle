import { useMutation } from 'react-query';
import { useAxios } from '../utils';
import { AxiosInstance } from 'axios';

const deleteSong = async (axiosInstance: AxiosInstance, songId: string): Promise<void> => {
    await axiosInstance.delete(`/api/song/${songId}`);
};


export function useDeleteSong() {
  const axiosInstance = useAxios();
  return useMutation((songId: number) => deleteSong(axiosInstance, songId), {
    onSuccess: () => {
      alert('노래가 삭제되었습니다.');
    },
    onError: (error) => {
        throw error;
    },
  });
}
