import React from "react";
import {
  StyledAlbumArtImg,
  StyledAlbumCircle,
  StyledAlbumCircleImg,
  StyledAlbumWrapper,
} from "./styles";

interface AlbumArtComponentProps {
  albumArtSrc: string;
}
export default function AlbumArtComponent({
  albumArtSrc,
}: AlbumArtComponentProps) {
  return (
    <StyledAlbumWrapper>
      <StyledAlbumArtImg src={albumArtSrc} />
      <StyledAlbumCircle>
        <StyledAlbumCircleImg src={albumArtSrc} />
      </StyledAlbumCircle>
    </StyledAlbumWrapper>
  );
}
