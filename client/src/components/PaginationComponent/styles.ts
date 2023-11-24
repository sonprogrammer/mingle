import tw, { styled } from "twin.macro";
interface StyledNumbersProps {
    isSelected: boolean
}
export const StyledPreviousButton = styled.div`
    ${tw`flex cursor-pointer items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
`;
export const StyledNextButton = styled.div`
    ${tw`flex cursor-pointer items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
`;
export const StyledNumbers = styled.span<StyledNumbersProps>`
    ${tw`flex cursor-pointer items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
    background-color:  ${({ isSelected }) => (isSelected ? '#9b59b6' : '#fff')}; 
    color:  ${({ isSelected }) => (isSelected ? '#fff' : '#6b7280')}; 
`;