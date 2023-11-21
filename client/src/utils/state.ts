import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';
const { persistAtom } = recoilPersist();

export const loginState = atom<{isLogin: boolean, accessToken: string, expireTime: number}>({
    key: 'login',
    default: {
        isLogin: false,
        accessToken: '',
        expireTime: 0,
    },
    effects_UNSTABLE: [persistAtom],
});