import { AxiosInstance } from 'axios';
import { useQuery } from 'react-query';
import { Playlists } from '../types';
import { useAxios } from '../utils';

const getPlaylistsByLike = async (axiosInstance: AxiosInstance): Promise<Playlists[]> => {
	const response = await axiosInstance.get(		
        '/api/account/my-like-playlist'
	);
	return response.data.playList;
};
export function useGetPlaylistsByLike() {
    const axiosInstance = useAxios();
	return useQuery(["get-playlists-by-like"], () => getPlaylistsByLike(axiosInstance),
	{
		refetchOnWindowFocus: false,
    	retry: 1,
	});
}