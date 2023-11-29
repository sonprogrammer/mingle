import { useMutation } from 'react-query';
import { useAxios } from '../utils';
import { AxiosInstance } from 'axios';

const deletePlaylistComment = async (
  { playlistId, commentId }: { playlistId: string; commentId: string },
  axiosInstance: AxiosInstance,
) => {
  const response = await axiosInstance.delete(
    `/api/playlist/playlistComment/${playlistId}/${commentId}`,
  );
  return response.data;
};

export function useDeletePlaylistComment() {
  const axiosInstance = useAxios();
  return useMutation(
    ({ playlistId, commentId }: { playlistId: string; commentId: string }) =>
      deletePlaylistComment({ playlistId, commentId }, axiosInstance),
  );
}
