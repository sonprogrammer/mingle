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
