
import { AxiosInstance } from 'axios';
import { useQuery } from 'react-query';
import { useAxios } from '../utils';


const getAllGenres = async (axiosBase: AxiosInstance): Promise<{_id: string, genre: string}[]> => {
	const response = await axiosBase.get(		
        '/api/genre'
	);
	return response.data;
};
export function useGetAllGenres() {
	const { axiosBase } = useAxios();
	return useQuery(["get-all-genre"], () => getAllGenres(axiosBase));
}