import React from 'react';
import {
  StyledAlbumArtImg,
  StyledAlbumCircle,
  StyledAlbumCircleImg,
  StyledAlbumWrapper,
} from './styles';

interface AlbumArtComponentProps {
  albumArtSrc: string;
}
export default function AlbumArtComponent({
  albumArtSrc,
}: AlbumArtComponentProps) {
  console.log(albumArtSrc);
  return (
    <StyledAlbumWrapper>
      <StyledAlbumArtImg src={`/file/playListCover/${albumArtSrc}`} />
      <StyledAlbumCircle>
        <StyledAlbumCircleImg src={`/file/playListCover/${albumArtSrc}`} />
      </StyledAlbumCircle>
    </StyledAlbumWrapper>
  );
}
