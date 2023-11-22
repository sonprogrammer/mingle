import tw, { styled } from 'twin.macro';

export const StyledContainer = styled.div`
    ${tw`
        mx-20
    `}
`
export const StyledWeatherName = styled.div`
    ${tw`
        text-2xl
        mt-4
        ml-10
        font-semibold
    `}
`
export const StyledPlaylist = styled.div`
    ${tw`
        flex
        flex-wrap
        mt-6
    `}
    > div{
        ${tw`
            ml-10
            mb-10
            w-1/5
        `}
    }
`
