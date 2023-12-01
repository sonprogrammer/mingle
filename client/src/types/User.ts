export interface User {
    playListPreview?: string[];
    _id: string;
    userEmail: string;
    userPassword: string;
    userNickname: string;
    userPreference: string[];
    userFile: string;
    userDescription: string;
    userFollow: string[];
    userFollower: string[];
}