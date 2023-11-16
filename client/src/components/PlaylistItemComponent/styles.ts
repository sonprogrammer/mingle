import tw, { styled } from "twin.macro";
interface StyledContentsItemProps {
    isClick: boolean;
    isMouseOver: boolean;
}
export const StyledContentsItem = styled.div<StyledContentsItemProps>`
    ${tw`flex transition justify-between delay-75 text-2xl py-4 px-4 cursor-pointer`}
    background-color: ${({ isClick }) => (isClick ? '#bebebe' : 'none')};
    color: ${({ isClick }) => (isClick? '#fff' : '#9e9e9e')};
    font-weight: ${({ isClick }) => (isClick ? 'bold' : 'normal')}; 
    text-shadow: ${({ isClick }) => (isClick ? '2px 2px 2px gray' : 'none')}; 
    font-size: ${({isMouseOver}) => (isMouseOver ? '1.6rem' : '1.5rem')}
`;
export const StyledContentsItemLength = styled.div`
    font-weight: normal;
    font-size: 1rem;
`;