import React, { Dispatch, SetStateAction, useState } from "react";
import { StyledContentsItem, StyledContentsItemLength } from "./styles";

interface PlaylistItemComponentProps {
  item: {
    title: string;
    length: string;
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
  const handleClick = () => {
    setSelectedSong(true);
    setSelectedIdx(idx);
    setIsClick(!isClick);
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
