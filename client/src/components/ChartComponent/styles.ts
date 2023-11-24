import tw, { styled } from "twin.macro";

export const StyledTitleWrapper = styled.div`
    ${tw`flex justify-between`}
`;
export const StyledChartTitleWrapper = styled.div`
    ${tw`w-[15%] flex`}
`;
export const StyledChartTitle = styled.div`
    ${tw`w-full text-xl font-bold`}
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
    padding: 30px;
`;
export const StyledSelect = styled.select`
    ${tw`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-[80%]`}
`;