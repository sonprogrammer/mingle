import tw, { styled } from "twin.macro";
import AudioPlayer from 'react-h5-audio-player';

interface PlayingPlaybarProps {
  progress: number;
}
export const Container = styled.div`
  ${tw`mt-10 mx-auto flex items-center gap-[10px]`}
  padding: 0 650px;
`;
export const PlayComponent = styled.div`
  ${tw`mt-[-20px] text-white text-sm w-full`}
`;
export const SongInfo = styled.div`
  ${tw`pb-2 font-bold`}
  font-size: 16px;
`;
export const PlayingPlaybar = styled.div<PlayingPlaybarProps>`
  ${tw`h-2 absolute z-1`}
  background: #9b59b6;
  width: ${({ progress }) => (progress ? `${progress}%` : 0)};
`;
export const Playbar = styled(AudioPlayer)`
${tw`bg-white w-full h-2 relative`}
  .rhap_progress-section {
    display: none;
  }
  .rhap_controls-section { 
    display: none;
  }
`;
export const VolumeBar = styled.div`
${tw`bg-white w-1/12 h-2 absolute`}
  right: 480px;
`;
export const ControlVolumeBar = styled.div`
  ${tw`h-2 absolute z-1`}
  background: #9b59b6;
  width: 30px;
  right: 610px;
`;
export const StyledMuteContainer = styled.div`
  width: 30px;
  padding: 2px;
  cursor: pointer;
`;
export const StyledControlContainer = styled.div`
  width: 30px;
  padding: 2px;
  cursor: pointer;
`;