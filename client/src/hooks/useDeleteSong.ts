import { useMutation, useQueryClient } from 'react-query';
import { useAxios } from '../utils';
import { AxiosInstance } from 'axios';


const deleteSong = async (axiosInstance: AxiosInstance, songId: string): Promise<void> => {
    const response = await axiosInstance.delete(`/api/song/${songId}`);
    return response.data
};


export function useDeleteSong() {
  const axiosInstance = useAxios();
  const queryClient = useQueryClient();
  return useMutation((songId: string) => deleteSong(axiosInstance, songId), {
    onSuccess: () => {
      queryClient.invalidateQueries()
    },
    onError: (error) => {
        throw error;
    },
  });
}
