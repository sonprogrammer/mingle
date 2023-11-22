import tw, { styled } from 'twin.macro';

export const StyledButtons = styled.div`
  ${tw`
        flex
        py-5
        text-lg
        justify-around
        font-bold
    `}
`;
export const StyledMyPlaylistButtons = styled.div<{ selected: boolean }>`
  ${tw`
        py-2
        px-10
        cursor-pointer
        mx-2
        transition
        duration-300
        ease-in-out
        rounded-full
    `}
  &:hover {
    ${tw`
            bg-[#9b59b6]
            text-white
        `}
  }
  ${({ selected }) => (selected ? tw`bg-[#9b59b6] text-white` : '')}
`;
export const StyledLikedButtons = styled.div<{ selected: boolean }>`
  ${tw`
    py-2
    px-8
    cursor-pointer
    transition
        duration-300
        ease-in-out
        rounded-full
    `}
  &:hover {
    ${tw`
            bg-[#9b59b6]
            text-white
        `}
  }
  ${({ selected }) => (selected ? tw`bg-[#9b59b6] text-white` : '')}
`;
export const PlaylistContainer = styled.div`
  ${tw`
        mt-5
        mx-20
    `}
`;
export const PlaylistConetent = styled.div`
    ${tw`
        flex
        flex-wrap
    `}
    > div{
        ${tw`
            ml-10
            mb-10
            w-1/5
        `}
`;
