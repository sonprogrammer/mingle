import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';
const { persistAtom } = recoilPersist();

export const loginState = atom<{
    isLogin: boolean,
    accessToken: string,
    accessExpiredDate: Date,
}>({
    key: 'login',
    default: {
        isLogin: false,
        accessToken: '',
        accessExpiredDate: new Date(),
    },
    effects_UNSTABLE: [persistAtom],
});