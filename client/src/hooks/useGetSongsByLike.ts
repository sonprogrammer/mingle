import { AxiosInstance } from 'axios';
import { useMutation, useQuery, useQueryClient } from 'react-query';
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
	return useQuery(["get-songs-by-like"], () => getSongsByLike(axiosInstance, pageNum),
	{
		refetchOnWindowFocus: false,
    	retry: 1,
	});
}
export function useRefreshGetSongsByLike(pageNum: number) {
	const axiosInstance = useAxios();
	const queryClient = useQueryClient();
	return useMutation(
	  async () => {
		const data: Songs = await getSongsByLike(axiosInstance, pageNum);
		queryClient.setQueryData("get-songs-by-like", data);
	  }
	);
  }