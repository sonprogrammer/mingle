import { AxiosInstance } from 'axios';
import { useMutation,useQueryClient } from 'react-query';
import { useAxios } from '../utils';


const postLikeToggle = async (axiosInstance: AxiosInstance, songId: string) => {
    const response = await axiosInstance.post(`/api/song/${songId}/like-push`)
    return response
}

export function usePostlikeToggle(){
    const { axiosInstance } = useAxios();
    const queryClient = useQueryClient();

    return useMutation(
        (songId: string) => postLikeToggle(axiosInstance, songId),
        {
            onSuccess: () =>{
                queryClient.invalidateQueries()
            }
        }
    )
}