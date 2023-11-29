import tw,{styled} from "twin.macro";


export const Box = styled.div`
    ${tw`
        relative
        mx-auto
        flex
        overflow-hidden
        justify-center
        // ml-[-30px]
        // overflow-visible
        relative
        left-[-20px]
        mt-[50px]
    `}
`



export const MoveLeftButton = styled.div`
    ${tw`
    w-16 h-16
    absolute
    left-1
    top-1/2
    transform -translate-y-1/2
    bg-gray-500
    rounded-full
    flex items-center justify-center
    cursor-pointer
    transition duration-300 ease-in-out
    hover:bg-[#9b59b6]
    z-40
    `
    }
    svg{
        ${tw`
        text-white`}
    }
`

export const MoveRightButton = styled.div`
    ${tw`
    w-16 h-16
    absolute
    right-1
    top-1/2
    transform -translate-y-1/2
    bg-gray-500
    rounded-full
    flex items-center justify-center
    cursor-pointer
    transition duration-300 ease-in-out
    hover:bg-[#9b59b6]
    `
    }
    svg{
        ${tw`
        text-white`}
    }
`