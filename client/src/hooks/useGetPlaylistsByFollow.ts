import { AxiosInstance } from 'axios';
import { useQuery } from 'react-query';
import { Playlists } from '../types';
import { useAxios } from '../utils';

const getPlaylistsByFollow = async (axiosInstance: AxiosInstance): Promise<Playlists[]> => {
	const response = await axiosInstance.get(		
        '/api/playlist/users/following/playlists'
	);
	return response.data.feedPlaylists;
};
export function useGetPlaylistsByFollow() {
    const axiosInstance = useAxios();
	return useQuery(["get-playlists-by-follow"], () => getPlaylistsByFollow(axiosInstance),
	{
		refetchOnWindowFocus: false,
    	retry: 1,
	});
}