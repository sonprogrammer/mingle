import { AxiosInstance } from 'axios';
import { useQuery } from 'react-query';
import { Songs } from '../types';
import { useAxios } from '../utils';

const getSongsByLike = async (axiosInstance: AxiosInstance, pageNum: number): Promise<Songs> => {
	const response: Songs | PromiseLike<Songs> = await axiosInstance.get(		
        `/api/songs/user-liked?&page=${pageNum}&pageSize=8`
	);
	return response;
};
export function useGetSongsByLike(pageNum: number) {
    const axiosInstance = useAxios();
	return useQuery(["get-songs-by-like", pageNum], ({ queryKey }) => getSongsByLike(axiosInstance, queryKey[1] as number),
	{
		refetchOnWindowFocus: false,
    	retry: 1,
	});
}