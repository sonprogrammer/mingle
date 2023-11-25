import tw, { styled } from "twin.macro";

interface StyledChartTitleProps {
    isGenre: boolean;
}
export const StyledTitleWrapper = styled.div`
    ${tw`flex justify-between`}
`;
export const StyledChartTitleWrapper = styled.div`
    ${tw`w-full flex`}
`;
export const StyledChartTitle = styled.div<StyledChartTitleProps>`
    ${tw`text-xl font-bold`}
    width: ${({ isGenre }) => (isGenre ? '10%' : '100%')}; 
`;
export const StyledChartAddButton = styled.div`
    ${tw`flex items-center rounded-full w-[90px] px-2 text-center cursor-pointer`}
    background-color: #9b59b6;
    color: #fff;
    gap: 4px;
    &:hover {
        opacity: 90%;
    }
`;
export const StyledChartWrapper = styled.div`
    padding: 10px 30px;
`;
export const StyledSelect = styled.select`
    ${tw`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-[10%]`}
`;