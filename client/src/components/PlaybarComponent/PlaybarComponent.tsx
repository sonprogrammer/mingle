import { PlayComponent, SongInfo, Playbar, Container } from './styles';
import { useNavigate } from 'react-router-dom';
import { musicState } from '../../utils';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import React, { useRef } from 'react';
import H5AudioPlayer, { RHAP_UI } from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

export default function PlaybarComponent() {
  const navigate = useNavigate();
  const music = useRecoilValue(musicState);
  const setMusic = useSetRecoilState(musicState);
  const handleClick = () => {
    if (music.playlistId !== '')
      navigate(`/playlist?id=${music.playlistId}`, {
        state: { id: music.idx },
      });
  };
  const playRef = useRef<H5AudioPlayer | null>(null);
  return (
    <Container>
      <PlayComponent>
        <span onClick={handleClick} className="cursor-pointer">
          {music.playlist ?? '재생 중인 플레이리스트가 없습니다.'}
        </span>
        <SongInfo>
          {music.title[music.idx] ?? '재생 중인 음악이 없습니다.'}
        </SongInfo>
        <Playbar
          className="playbar"
          ref={playRef}
          src={music.url[music.idx] ?? ''}
          volume={music.mute ? 0 : music.volume}
          layout="horizontal-reverse"
          customProgressBarSection={[
            RHAP_UI.CURRENT_TIME,
            RHAP_UI.PROGRESS_BAR,
            RHAP_UI.DURATION,
            RHAP_UI.VOLUME_CONTROLS,
          ]}
          onPlay={() => {
            setMusic({
              ...music,
              isPlaying: true,
            });
          }}
          onPause={() => {
            setMusic({
              ...music,
              isPlaying: false,
            });
          }}
          onEnded={() =>
            music.idx < music.url.length - 1
              ? setMusic({
                  ...music,
                  idx: music.idx + 1,
                })
              : setMusic({
                  ...music,
                  idx: 0,
                })
          }
          onClickPrevious={() => {
            music.idx > 0 &&
              setMusic({
                ...music,
                idx: music.idx - 1,
              });
          }}
          onClickNext={() => {
            music.idx < music.url.length - 1
              ? setMusic({
                  ...music,
                  idx: music.idx + 1,
                })
              : setMusic({
                  ...music,
                  idx: 0,
                });
          }}
          hasDefaultKeyBindings={false}
          showJumpControls={false}
          showSkipControls={true}
          customControlsSection={[RHAP_UI.MAIN_CONTROLS]}
        />
      </PlayComponent>
    </Container>
  );
}
