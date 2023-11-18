import tw,{styled} from "twin.macro";

export const StyledCommentContainer = styled.div`
    ${tw`
        w-full
        flex-col
        mt-10
    `}
    p{
        font-size: 24px;
        margin-left: 20px;
        margin-botton: 10px;
        font-weight: bold;
    }
`
export const StyledUser = styled.div`
    ${tw`
        flex
    `}
`

export const StyledUserNameAndImg = styled.div`
    ${tw`
        flex
        w-full
        pl-5
        mt-3
    `}
`
export const StyledUserName = styled.div`
    ${tw`
        text-2xl
        font-bold
        mt-6
        pl-4
    `}
`
export const StyledUserImg = styled.img`
    ${tw`
        w-20
    `}
`
export const StyledCommentAndFunction = styled.div`
    ${tw`
        flex
        justify-between
        px-4
        pl-8
        pt-5
        text-xl
    `}
`

export const StyledUserFunction = styled.div`
    ${tw`
        flex

    `}
`
export const StyledDelete = styled.div`
    ${tw`
        cursor-pointer 
        pl-2
    `}
`
export const StyledCorrection = styled.div`
    ${tw`
        cursor-pointer
        pr-2
    `}
`

export const StyledComment = styled.div`
    ${tw`

    `}
`
