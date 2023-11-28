import { atom } from 'recoil';

export const loginState = atom<{
    isLogin: boolean,
    accessToken: string,
    accessExpiredDate: Date,
}>({
    key: 'login',
    default: {
        isLogin: false,
        accessToken: '',
        accessExpiredDate: new Date(Date.now()),
    },
});

export const musicState = atom<{
    url: string,
    isPlaying: boolean,
    volume: number,
    mute: boolean,
}>({
    key: 'music',
    default: {
        url: '/song/Square.mp3',
        isPlaying: false,
        volume: 1,
        mute: false,
    }
})