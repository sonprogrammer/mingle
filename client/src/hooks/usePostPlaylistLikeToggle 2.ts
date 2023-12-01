import { AxiosInstance } from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { useAxios } from '../utils';

const postPlaylistLikeToggle = async (axiosInstance: AxiosInstance, id: string | undefined): Promise<string> => {
	const response = await axiosInstance.post(
		`/api/playlist/${id}/like`
	);
	return response.data;
};
export function usePostPlaylistLikeToggle(id: string | undefined) {
    const axiosInstance = useAxios();
    const queryClient = useQueryClient();
    return useMutation(() => postPlaylistLikeToggle(axiosInstance, id), {
        onSuccess: () => {
        queryClient.invalidateQueries("get-playlists-by-id");
    },
        onError: (e) => {
        console.log(`error: ${e}`);
    },
});
}