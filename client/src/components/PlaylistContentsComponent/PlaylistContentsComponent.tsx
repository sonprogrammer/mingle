import React, { useState } from "react";
import { PlaylistItemComponent } from "../PlaylistItemComponent";
import { StyledContentsTitle, StyledContentsWrapper } from "./styles";

interface PlaylistContentsComponentProps {
  songs: {
    title: string;
    length: string;
  }[];
}
export default function PlaylistContentsComponent({
  songs,
}: PlaylistContentsComponentProps) {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [selectedSong, setSelectedSong] = useState(true);
  return (
    <StyledContentsWrapper>
      <StyledContentsTitle>나의 재생목록 1</StyledContentsTitle>
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
    </StyledContentsWrapper>
  );
}
