import { AxiosInstance } from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { useAxios } from '../utils';

const deletePlaylistLikeToggle = async (axiosInstance: AxiosInstance, id: string | undefined): Promise<string> => {
	const response = await axiosInstance.delete(
		`/api/playlist/${id}/like`
	);
	return response.data;
};
export function useDeletePlaylistLikeToggle(id: string | undefined) {
    const axiosInstance = useAxios();
    const queryClient = useQueryClient();
    return useMutation(() => deletePlaylistLikeToggle(axiosInstance, id), {
        onSuccess: () => {
        queryClient.invalidateQueries("get-playlists-by-id");
        queryClient.invalidateQueries("get-playlists-by-follow");
    },
        onError: (e) => {
        console.log(`error: ${e}`);
    },
});
}