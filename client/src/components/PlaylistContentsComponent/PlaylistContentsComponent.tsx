import React, { useEffect, useState } from 'react';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { musicState } from '../../utils';
import { PlaylistItemComponent } from '../PlaylistItemComponent';
import {
  PlaylistItemWrapper,
  StyledContentsTitle,
  StyledContentsWrapper,
} from './styles';

interface PlaylistContentsComponentProps {
  playlistId: string | undefined;
  title: string | undefined;
  songs: {
    title: string;
    url: string;
    img: string;
    length: string;
  }[];
  songId: number;
}
export default function PlaylistContentsComponent({
  playlistId,
  title,
  songs,
  songId,
}: PlaylistContentsComponentProps) {
  const [selectedIdx, setSelectedIdx] = useState(songId);
  const [selectedSong, setSelectedSong] = useState(true);
  const setMusic = useSetRecoilState(musicState);
  const music = useRecoilValue(musicState);
  useEffect(() => {
    setMusic({
      playlistId: playlistId as string,
      playlist: title as string,
      title: songs[songId]?.title,
      img: `http://kdt-sw-6-team09.elicecoding.com/file/songImg/${songs[songId]?.img}`,
      url: `http://kdt-sw-6-team09.elicecoding.com/file/audio/${songs[songId]?.url}`,
      idx: songId,
      isPlaying: true,
      volume: music.volume,
      mute: music.mute,
    });
  }, []);
  return (
    <StyledContentsWrapper>
      <StyledContentsTitle>{title}</StyledContentsTitle>
      <PlaylistItemWrapper>
        {songs.map((item, idx) => {
          return (
            <PlaylistItemComponent
              item={item}
              selectedSong={idx === selectedIdx ? selectedSong : false}
              setSelectedSong={setSelectedSong}
              key={idx}
              idx={idx}
              setSelectedIdx={setSelectedIdx}
            />
          );
        })}
      </PlaylistItemWrapper>
    </StyledContentsWrapper>
  );
}
