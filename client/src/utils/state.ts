import { atom } from 'recoil';
import { UserInfo } from '../types';
import { recoilPersist } from 'recoil-persist';
const { persistAtom } = recoilPersist();

export const loginState = atom<{
  isLogin: boolean;
  accessToken: string;
  accessExpiredDate: Date;
}>({
  key: 'login',
  default: {
    isLogin: false,
    accessToken: '',
    accessExpiredDate: new Date(Date.now()),
  },
});

export const musicState = atom<{
  playlist: string;
  playlistId: string;
  title: string;
  url: string;
  idx: number;
  img: string;
  isPlaying: boolean;
  volume: number;
  mute: boolean;
}>({
  key: 'music',
  default: {
    playlistId: '',
    playlist: '재생목록을 선택해 주세요.',
    title: '현재 재생중인 노래가 없습니다.',
    img: '',
    idx: 0,
    url: '',
    isPlaying: false,
    volume: 1,
    mute: false,
  },
  effects_UNSTABLE: [persistAtom],
});

export const songUploaderState = atom<UserInfo | null>({
  key: 'songUploaderState',
  default: null,
  effects_UNSTABLE: [persistAtom],
});
