import { AxiosInstance } from 'axios';
import { useQuery } from 'react-query';
import { Playlists } from '../types';
import { useAxios } from '../utils';

const getPlaylistsBySearch = async (axiosInstance: AxiosInstance, keyword: string, pageNum: number):
    Promise<{ totalPages: number, currentPage: number, searchPlayList: Playlists[] }> => {
	const response = await axiosInstance.get(		
        `/api/playlist/playlistsearch/search?q=${keyword}&page=${pageNum}&pageSize=8`
	);
	return response.data;
};
export function useGetPlaylistsBySearch(keyword: string, pageNum: number) {
    const { axiosInstance } = useAxios();
	return useQuery(["get-playlists-by-search", keyword, pageNum], ({ queryKey }) =>
		getPlaylistsBySearch(axiosInstance, queryKey[1] as string, queryKey[2] as number),
		{
			refetchOnWindowFocus: false,
			retry: 1,
		}
	);
}