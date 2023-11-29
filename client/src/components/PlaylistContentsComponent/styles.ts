import tw, { styled } from "twin.macro";
export const StyledContentsWrapper = styled.div`
    ${tw`w-2/5`}
`
export const StyledContentsTitle = styled.div`
    ${tw`text-4xl font-bold my-6`}
`;
export const PlaylistItemWrapper = styled.div`
    height: 34vh;
    overflow-y: scroll;
    overflow-x: hidden;
    &::-webkit-scrollbar {
        display: none;
      }
`;