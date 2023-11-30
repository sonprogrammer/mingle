import { PlayComponent, SongInfo, Playbar, Container } from './styles';
import { useNavigate } from 'react-router-dom';
import { musicState } from '../../utils';
import { useRecoilValue } from 'recoil';
import React, { useRef } from 'react';
import H5AudioPlayer, { RHAP_UI } from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

export default function PlaybarComponent() {
  const navigate = useNavigate();
  const music = useRecoilValue(musicState);
  const handleClick = () => {
    navigate(`/playlist?id=${music.playlistId}`, { state: { id: music.idx } });
  };
  const playRef = useRef<H5AudioPlayer | null>(null);
  return (
    <Container>
      <PlayComponent>
        <span onClick={handleClick} className="cursor-pointer">
          {music.playlist}
        </span>
        <SongInfo>{music.title}</SongInfo>
        <Playbar
          className="playbar"
          ref={playRef}
          src={music.url}
          volume={music.mute ? 0 : music.volume}
          layout="horizontal-reverse"
          customProgressBarSection={[
            RHAP_UI.CURRENT_TIME,
            RHAP_UI.PROGRESS_BAR,
            RHAP_UI.DURATION,
            RHAP_UI.VOLUME_CONTROLS,
          ]}
          hasDefaultKeyBindings={false}
          showJumpControls={true}
          customControlsSection={[RHAP_UI.MAIN_CONTROLS]}
        />
      </PlayComponent>
    </Container>
  );
}
