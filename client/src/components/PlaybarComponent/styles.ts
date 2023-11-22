import tw, { styled } from "twin.macro";

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

export const Playbar = styled.div`
  ${tw`bg-white w-full h-2 relative`}
`;

export const PlayingPlaybar = styled.div`
  ${tw`w-1/12 h-2 absolute z-1`}
  background: #9b59b6;
`;