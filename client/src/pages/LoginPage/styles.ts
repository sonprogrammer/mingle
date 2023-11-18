import tw, { styled } from "twin.macro";

interface StyledTextWrapperProps {
    isJoin: boolean;
}
export const StyledLoginWrapper = styled.div`
    ${tw`w-1/3 text-left mx-auto`}
    margin-top: 80px;
`;
export const StyledHelpWrapper = styled.div`
    ${tw`flex justify-between`}
`;
export const StyledLabel = styled.label`
    ${tw`relative inline-flex items-center cursor-pointer`}
`;
export const StyledTextWrapper = styled.div<StyledTextWrapperProps>`
    ${tw`flex gap-[10px] items-center`}
    justify-content: ${({isJoin}) => (isJoin ? 'flex-start' : 'space-between')}
    color: ${({isJoin}) => (isJoin ? '#333333' : '#9b59b6')}
`;
export const Divider = styled.div`
    ${tw`h-[20px]`}
    width: 1px;
    border: 1px solid #ccc;
`
export const StyledTextButton = styled.div`
    ${tw`font-bold cursor-pointer`}
    color: #9b59b6;
`;