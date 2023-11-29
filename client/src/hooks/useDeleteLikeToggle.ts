import { AxiosInstance } from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { useAxios } from '../utils';

const deleteLikeToggle = async (axiosInstance: AxiosInstance, songId: string) => {
  const response = await axiosInstance.delete(`/api/song/${songId}/like-cancel`);
  return response.data;
};

export function useDeleteLikeToggle() {
  const axiosInstance = useAxios();
  const queryClient = useQueryClient();

  return useMutation(
    (songId: string) => deleteLikeToggle(axiosInstance, songId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries();
      },
    }
  );
}
