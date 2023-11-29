import tw, { styled } from "twin.macro";

export const StyledAlbumWrapper = styled.div`
    ${tw`flex w-[750px]`}
`;
export const StyledAlbumArtImg = styled.img`
    ${tw`w-[460px] h-[460px] z-20`}
`;
export const StyledAlbumCircle = styled.div`
    ${tw`rounded-full relative p-[230px] ml-[-230px]`}
    background: rgb(0,0,0);
    background: linear-gradient(0deg, rgba(0,0,0,1) 25%, rgba(82,82,82,1) 50%, rgba(0,0,0,1) 75%);
    animation: rotateAnimation 10s linear infinite;
    @keyframes rotateAnimation {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }
`;
export const StyledAlbumCircleImg = styled.img`
    ${tw`w-[180px] h-[180px] absolute rounded-full z-1 top-[140px] right-[140px]`}

`;