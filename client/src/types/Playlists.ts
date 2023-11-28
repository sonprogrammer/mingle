export interface Playlists {
    _id: string,
    playListSongs: string[],
    playListTitle: string,
    playListExplain: string,
    playListOwner: string,
    playListImg: string,
    playListComments: string[],
    createdAt: Date,
    updatedAt: Date,
    likedByUser: boolean,
    likeCount: number,
}

