export interface Songs {
    songs: [
        {
            song: {
                _id: string,
                songName: string,
                songDescription: string,
                songArtist: string,
                songUploader: {
                    _id: string,
                    userEmail: string,
                    userPassword: string,
                    userNickname: string,
                    userDescription: string,
                    likeSong: string[],
                    likePlayList: string[],
                    userImage: string,
                    userPreference: string[],
                    userFollow: string[],
                    userFollower: string[],
                    createdAt: Date,
                    updatedAt: Date,
                },
                songDuration: number,
                songImageLocation: string,
                audioLocation: string,
                songCategory: string,
                songMood: string,
                createdAt: Date,
                updatedAt: Date,
            },
            isCurrentUserLiked: boolean,
        }
    ],
    currentPage: number,
    totalPages: number,
}