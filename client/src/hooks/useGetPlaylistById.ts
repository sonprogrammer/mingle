import { AxiosInstance } from 'axios';
import { useQuery } from 'react-query';
import { Playlists } from '../types';
import { useAxios } from '../utils';

const getPlaylistById = async (axiosInstance: AxiosInstance, id: string): Promise<Playlists> => {
	const response = await axiosInstance.get(		
        `/api/playlist/${id}`
	);
	return response.data;
};
export function useGetPlaylistById(id: string) {
    const axiosInstance = useAxios();
	return useQuery(["get-playlists-by-id", id], ({ queryKey }) =>
		getPlaylistById(axiosInstance, queryKey[1] as string),
		{
			refetchOnWindowFocus: false,
			retry: 1,
		}
	);
}