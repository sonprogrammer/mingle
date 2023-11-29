import React, { useState } from 'react';
import { PlaylistItemComponent } from '../PlaylistItemComponent';
import {
  PlaylistItemWrapper,
  StyledContentsTitle,
  StyledContentsWrapper,
} from './styles';

interface PlaylistContentsComponentProps {
  title: string | undefined;
  songs: {
    title: string;
    url: string;
    img: string;
    length: string;
  }[];
}
export default function PlaylistContentsComponent({
  title,
  songs,
}: PlaylistContentsComponentProps) {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [selectedSong, setSelectedSong] = useState(true);
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
