import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { musicState } from '../../utils';
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
  const music = useRecoilValue(musicState);
  const [isPlaying, setIsPlaying] = useState(false);
  useEffect(() => {
    setIsPlaying(music.isPlaying);
  }, [music.isPlaying]);
  return (
    <StyledAlbumWrapper>
      <StyledAlbumArtImg src={albumArtSrc} />
      <StyledAlbumCircle isPlaying={isPlaying}>
        <StyledAlbumCircleImg src={albumArtSrc} />
      </StyledAlbumCircle>
    </StyledAlbumWrapper>
  );
}
