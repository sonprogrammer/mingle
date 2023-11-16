import tw, { styled } from "twin.macro";

export const StyledAlbumWrapper = styled.div`
    ${tw`flex w-[750px]`}
`;
export const StyledAlbumArtImg = styled.img`
    ${tw`w-[500px] z-20`}
`;
export const StyledAlbumCircle = styled.div`
    ${tw`w-[500px] rounded-full relative p-[250px] ml-[-250px]`}
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
    ${tw`w-[200px] h-[200px] absolute rounded-full z-1 top-[150px] right-[150px]`}

`;