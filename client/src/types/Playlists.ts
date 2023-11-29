import { SongDetail } from "./SongDetail";
import { User } from "./User";

export interface Playlists {
    _id: string,
    playListSongs: string[],
    playListTitle: string,
    playListExplain: string,
    playListOwner: User,
    playListImg: string,
    playListComments: string[],
    createdAt: Date,
    updatedAt: Date,
    like: boolean,
    likeCount: number,
    songDetails: SongDetail[],
}

