
import tw,{ styled} from 'twin.macro';



export const Nav = styled.nav`
  ${tw`
    fixed
    left-0
      top-0
    bg-[#404040]
    box-border
    text-white
    // top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#404040] text-white p-4 flex flex-col
    h-full
    border-r-indigo-500
  `}
  width: 16rem;
`

export const Logo = styled.span`
  ${tw`
    text-4xl font-semibold
  `}
`

export const DivideLine = styled.div`
  ${tw`
    flex items-center justify-center h-20 border-b
  `}
`

export const ButtonsContainer = styled.div`
  ${tw`
    flex 
    flex-col 
    mt-4
    cursor-pointer
    hover:border-slate-400 
    justify-between
  `}
`

export const ButtonWrapper = styled.div`
  ${tw`
    flex
    items-center space-x-3
  `}
  width: 16rem;
`

export const Button = styled.div`
  ${tw`
    flex items-center space-x-3 p-2 
    hover:bg-zinc-900 
    hover:border-slate-400 
    pl-4
    py-4
  `}
  width: 16rem;
`


export const DropdownButton = styled.div`
  ${tw`
    absolute
    left-56
    flex
    cursor-pointer 
    ml-4
    w-5
  `}
`

export const Dropeddown = styled.div`
  ${tw`
    bg-gray-400 absolute top-28 left-60 flex flex-col items-start rounded-lg p-2 w-32 text-center
    ml-auto
  `}
`



export const DropeddownContents = styled.div`
  ${tw`
    flex w-full hover:bg-blue-300 cursor-pointer rounded-r-lg border-l-transparent
  `}
`


export const DropdownItem = styled.div`
  ${tw`
    p-2 cursor-pointer hover:bg-gray-200
  `}
`


export const DropdownMenu = styled.div`
  absolute 
  flex
  flex-col
  top-20
  right-20

`

export const DropdownList = styled.ul`
  flex
  flex-col 
  gap-4
`
