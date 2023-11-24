import { AxiosInstance } from 'axios';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { Songs } from '../types';
import { useAxios } from '../utils';

const getSongsByGenre = async (axiosInstance: AxiosInstance, genre: string | undefined, pageNum: number): Promise<Songs> => {
	console.log(genre);
	const response: Songs | PromiseLike<Songs> = await axiosInstance.get(		
        `/api/songs?category=${genre}&page=${pageNum}&pageSize=8`
	);
	return response;
};
export function useGetSongsByGenre(genre: string | undefined, pageNum: number) {
    const axiosInstance = useAxios();
	return useQuery(["get-songs-by-genre"], () => getSongsByGenre(axiosInstance, genre, pageNum),
	{
		refetchOnWindowFocus: false,
    	retry: 1,
	});
}
export function useRefreshGetSongsByGenre(genre: string | undefined, pageNum: number) {
	const axiosInstance = useAxios();
	const queryClient = useQueryClient();
	return useMutation(
	  async () => {
		const data: Songs = await getSongsByGenre(axiosInstance, genre, pageNum);
		queryClient.setQueryData("get-songs-by-genre", data);
	  }
	);
  }