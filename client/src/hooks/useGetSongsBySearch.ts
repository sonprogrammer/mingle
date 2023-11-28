import { AxiosInstance } from 'axios';
import { useQuery } from 'react-query';
import { Songs } from '../types';
import { useAxios } from '../utils';

const getSongsBySearch = async (axiosInstance: AxiosInstance, type: string, keyword: string, pageNum: number): Promise<Songs> => {
	const response = await axiosInstance.get(		
        `/api/songs?search=${keyword}&type=${type}&page=${pageNum}&pageSize=8`
	);
	return response.data;
};
export function useGetSongsBySearch(type: string, keyword: string, pageNum: number) {
    const axiosInstance = useAxios();
	return useQuery(["get-songs-by-search", type, keyword, pageNum], ({ queryKey }) =>
		getSongsBySearch(axiosInstance, queryKey[1] as string, queryKey[2] as string, queryKey[3] as number),
		{
			refetchOnWindowFocus: false,
			retry: 1,
		}
	);
}