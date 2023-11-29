import React, { Dispatch, SetStateAction, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { musicState } from '../../utils';
import { StyledContentsItem, StyledContentsItemLength } from './styles';

interface PlaylistItemComponentProps {
  item: {
    title: string;
    length: string;
    url: string;
    img: string;
  };
  idx: number;
  selectedSong: boolean;
  setSelectedIdx: Dispatch<SetStateAction<number>>;
  setSelectedSong: Dispatch<SetStateAction<boolean>>;
}
export default function PlaylistItemComponent({
  item,
  idx,
  selectedSong,
  setSelectedIdx,
  setSelectedSong,
}: PlaylistItemComponentProps) {
  const [isMouseOver, setIsMouseOver] = useState(false);
  const [isClick, setIsClick] = useState(false);
  const setMusic = useSetRecoilState(musicState);
  const music = useRecoilValue(musicState);
  const handleClick = () => {
    setSelectedSong(true);
    setSelectedIdx(idx);
    setIsClick(!isClick);
    setMusic({
      playlistId: music.playlistId,
      playlist: music.playlist,
      title: item.title,
      img: `http://kdt-sw-6-team09.elicecoding.com/file/songImg/${item.img}`,
      url: `http://kdt-sw-6-team09.elicecoding.com/file/audio/${item.url}`,
      idx: idx,
      isPlaying: true,
      volume: music.volume,
      mute: music.mute,
    });
  };
  const handleMouseOver = () => {
    setIsMouseOver(true);
  };
  const handleMouseOut = () => {
    setIsMouseOver(false);
  };
  return (
    <StyledContentsItem
      onClick={handleClick}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      isClick={selectedSong}
      isMouseOver={isMouseOver}
    >
      {item.title}
      <StyledContentsItemLength>{item.length}</StyledContentsItemLength>
    </StyledContentsItem>
  );
}
