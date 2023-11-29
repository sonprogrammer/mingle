import tw, { styled } from "twin.macro";
import AudioPlayer from 'react-h5-audio-player';

export const Container = styled.div`
  ${tw`mt-8 mx-auto flex items-center gap-[10px]`}
  padding: 0 650px;
`;
export const PlayComponent = styled.div`
  ${tw`mt-[-20px] text-white text-sm w-full`}
`;
export const SongInfo = styled.div`
  ${tw`font-bold`}
  font-size: 16px;
`;
export const Playbar = styled(AudioPlayer)`
  background-color: #404040;
  box-shadow: none;
  padding: 0;
  .rhap_time, .rhap_volume-button, .rhap_play-pause-button, .rhap_main-controls-button {
    color: #fff;
  }
  .rhap_controls-section {
    margint: 0 8px;
    flex: 0 1 auto;
  }
  .rhap_main-controls-button {
    margin-left: -8px;
    margin-right: 8px;
  }
  .rhap_time {
    width: 40px;
  }
  .rhap_main {
    flex: 1 0 auto;
  }
  .rhap_progress-container {
    width: 38%;
    margin-right: 8px;
  }
  .rhap_progress-bar, .rhap_volume-bar {
    background-color: #fff;
  }
  .rhap_progress-section {
    margin-left: -8px;
  }
  .rhap_progress-indicator, .rhap_progress-filled, .rhap_volume-indicator {
    background-color: #b959b6;
  }
  .rhap_progress-indicator {
    width: 12px;
    height: 12px;
    margin-left: -5px;
    top: -4px;
  }
`;