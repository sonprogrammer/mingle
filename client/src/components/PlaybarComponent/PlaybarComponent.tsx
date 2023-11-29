import { PlayComponent, SongInfo, Playbar, Container } from './styles';
import { useNavigate } from 'react-router-dom';
import { musicState } from '../../utils';
import { useRecoilValue } from 'recoil';
import React, { useEffect, useRef, useState } from 'react';
import H5AudioPlayer, { RHAP_UI } from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

export default function PlaybarComponent() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/myplaylist');
  };
  const music = useRecoilValue(musicState);
  const [play, setPlay] = useState(music.isPlaying);
  const playRef = useRef<H5AudioPlayer | null>(null);
  const handleStop = () => {
    setPlay(false);
  };
  useEffect(() => {
    if (!playRef.current?.audio.current) return;
    if (play) {
      playRef.current.audio.current.play();
    } else {
      playRef.current.audio.current.pause();
    }
  }, [play, music]);
  return (
    <Container>
      <PlayComponent>
        <span onClick={handleClick} className="cursor-pointer">
          재생목록을 선택해 주세요.
        </span>
        <SongInfo>현재 재생중인 노래가 없습니다.</SongInfo>
        <Playbar
          className="playbar"
          ref={playRef}
          src={music.url}
          volume={music.mute ? 0 : music.volume}
          onEnded={handleStop}
          layout="horizontal-reverse"
          customProgressBarSection={[
            RHAP_UI.CURRENT_TIME,
            RHAP_UI.PROGRESS_BAR,
            RHAP_UI.DURATION,
            RHAP_UI.VOLUME_CONTROLS,
          ]}
          hasDefaultKeyBindings={false}
          showJumpControls={false}
          showSkipControls={true}
          customControlsSection={[RHAP_UI.MAIN_CONTROLS]}
        />
      </PlayComponent>
    </Container>
  );
}
