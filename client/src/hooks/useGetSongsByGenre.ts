import { AxiosInstance } from 'axios';
import { useQuery } from 'react-query';
import { Songs } from '../types';
import { useAxios } from '../utils';

const getSongsByGenre = async (axiosInstance: AxiosInstance, genre: string | undefined, pageNum: number): Promise<Songs> => {
	const response = await axiosInstance.get(		
        `/api/songs?category=${genre}&page=${pageNum}&pageSize=8`
	);
	return response.data;
};
export function useGetSongsByGenre(genre: string | undefined, pageNum: number) {
    const { axiosInstance } = useAxios();
	return useQuery(["get-songs-by-genre", genre, pageNum], ({ queryKey }) => getSongsByGenre(axiosInstance, queryKey[1] as string, queryKey[2] as number),
	{
		refetchOnWindowFocus: false,
    	retry: 1,
	});
}