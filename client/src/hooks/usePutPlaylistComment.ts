import { AxiosInstance } from 'axios';
import { useMutation } from 'react-query';
import { useAxios } from '../utils';

const putPlaylistComment = async (
  { commentId, comment }: { commentId: string; comment: string },
  axiosInstance: AxiosInstance,
) => {
  const response = await axiosInstance.put(
    `/api/playlist/playlistComment/${commentId}`,
    { comment },
  );
  return response.data;
};

export function usePutPlaylistComment() {
  const axiosInstance = useAxios();
  const mutation = useMutation(
    ({ commentId, comment }: { commentId: string; comment: string }) =>
      putPlaylistComment({ commentId, comment }, axiosInstance),
  );
  return mutation;
}
