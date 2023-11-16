
import tw, {styled} from "twin.macro";


export const UserInfo = styled.div`
    ${tw`
    flex
    items-center
    px-16
    bg-[#e0e0e0]
    flex-wrap
    justify-between	
    border-b-2
    border-zinc-500
    `}
`



export const UserImageContainer = styled.div`
${tw`
     
`}
`

export const UserImage = styled.img`
 ${tw`
    rounded-full
    w-20
 `}
`
    
export const UserDescript = styled.div`
${tw`
    // flex
    flex-col
    ml-4
    gap-3
    flex
    mt-3
`}
  
  input{
    ${tw`
        fixed
    
        border
        rounded-md
    `}
  }
`


export const UserSubInfo = styled.div`
  ${tw`
    flex
  `}
`

export const UserStatus = styled.div`
${tw`
    p-4
    flex
    // ml-auto
    mt-10
    `}
    `




export const PostCount = styled.div`
${tw`
    p-4
    flex
    `}
    p{
        margin-right: 4px;
    }

`



export const Follower = styled.div`
${tw`
    p-4
    flex
    `}
    p{
        margin-right: 4px;
    }
`



export const Following = styled.div`
${tw`
    p-4
    flex
    `}
    p{
        margin-right: 4px;
    }
`
