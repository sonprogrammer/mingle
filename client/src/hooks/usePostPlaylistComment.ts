import { useAxios } from '../utils';
import { AxiosInstance } from 'axios';
import { useMutation } from 'react-query';

const postPlaylistComment = async (
  { playlistId, comment }: { playlistId: string; comment: string },
  axiosInstance: AxiosInstance,
) => {
  const response = await axiosInstance.post(
    `/api/playlist/playlistComment/${playlistId}`,
    { comment },
  );
  return response.data;
};

export function usePostPlaylistComment() {
  const axiosInstance = useAxios();
  const mutation = useMutation(
    (data: { playlistId: string; comment: string }) =>
      postPlaylistComment(data, axiosInstance),
  );
  return mutation;
}
