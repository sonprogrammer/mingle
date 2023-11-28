import {
  PlayComponent,
  SongInfo,
  PlayingPlaybar,
  Playbar,
  Container,
  StyledMuteContainer,
  StyledControlContainer,
} from './styles';
import {
  faCirclePlay,
  faCirclePause,
  faVolumeHigh,
  faVolumeXmark,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import { musicState } from '../../utils';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import React, { useEffect, useRef, useState } from 'react';
import H5AudioPlayer from 'react-h5-audio-player';

export default function PlaybarComponent() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/myplaylist');
  };
  const setMusic = useSetRecoilState(musicState);
  const music = useRecoilValue(musicState);
  const [play, setPlay] = useState(music.isPlaying);
  const progress = useRef<number>(0);
  console.log(progress.current);
  const playRef = useRef<H5AudioPlayer | null>(null);
  const handlePlay = () => {
    if (playRef.current?.audio.current)
      playRef.current.audio.current.volume = music.volume / 100;
    setPlay(true);
  };
  const handleStop = () => {
    setPlay(false);
  };
  useEffect(() => {
    if (!playRef.current?.audio.current) return;
    if (play) {
      playRef.current.audio.current.play();
      playRef.current.audio.current.volume = music.mute
        ? 0
        : music.volume / 100;
    } else {
      playRef.current.audio.current.pause();
    }
  }, [play, music]);
  useEffect(() => {
    if (play) {
      const totalTime = document.querySelector('.rhap_total-time')
        ?.innerHTML as string;
      const [totalMinutes, totalSeconds] = totalTime.split(':').map(Number);
      const totalMiliSeconds = (totalMinutes * 60 + totalSeconds) * 1000;
      const increment = 542 / (totalMiliSeconds / 1000);
      const progressChange = setInterval(() => {
        const progressBar = document.getElementById('playing');
        progress.current += increment;
        if (progressBar !== null)
          progressBar.style.width = `${progress.current}px`;
        if (progress.current >= 546 || playRef.current?.audio.current?.paused)
          clearInterval(progressChange);
      }, 1000);
    }
  }, [play, progress]);
  return (
    <Container>
      <StyledControlContainer>
        {play ? (
          <FontAwesomeIcon
            icon={faCirclePause}
            color="white"
            size="xl"
            onClick={handleStop}
          />
        ) : (
          <FontAwesomeIcon
            icon={faCirclePlay}
            color="white"
            size="xl"
            onClick={handlePlay}
          />
        )}
      </StyledControlContainer>
      <PlayComponent>
        <span onClick={handleClick} className="cursor-pointer">
          나의 재생목록 1
        </span>
        <SongInfo>Troye Sivan - Lost Boy</SongInfo>
        <PlayingPlaybar id="playing" progress={progress.current} />
        <Playbar
          className="playbar"
          ref={playRef}
          src={music.url}
          onEnded={handleStop}
          layout="horizontal"
          hasDefaultKeyBindings={false}
        />
      </PlayComponent>
      <StyledMuteContainer>
        {music.mute ? (
          <FontAwesomeIcon
            icon={faVolumeXmark}
            color="white"
            size="xl"
            onClick={() =>
              setMusic({
                url: music.url,
                isPlaying: music.isPlaying,
                volume: 1,
                mute: false,
              })
            }
          />
        ) : (
          <FontAwesomeIcon
            icon={faVolumeHigh}
            color="white"
            size="xl"
            onClick={() =>
              setMusic({
                url: music.url,
                isPlaying: music.isPlaying,
                volume: 0,
                mute: true,
              })
            }
          />
        )}
      </StyledMuteContainer>
    </Container>
  );
}
