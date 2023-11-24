
import axios from 'axios';
import { useQuery } from 'react-query';


const getAllGenres = async (): Promise<{_id: string, genre: string}[]> => {
	const response = await axios.get(		
        '/api/genre'
	);
	return response.data;
};
export function useGetAllGenres() {
	return useQuery(["get-all-genre"], () => getAllGenres());
}