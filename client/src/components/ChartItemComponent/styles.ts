import tw, { styled } from "twin.macro";
interface StyledChartItemProps {
    isClick: boolean;
}
export const ChartItemImg = styled.img`
    ${tw`w-[50px]`}
    max-width: 50px;
`;

export const StyledTr = styled.tr<StyledChartItemProps>`
    ${tw`transition delay-75`}
    cursor: pointer;
    background-color: ${({ isClick }) => (isClick ? '#ebebeb' : 'none')};
    color: ${({ isClick }) => (isClick ? '#9b59b6' : '#333333')};
    font-weight: ${({ isClick }) => (isClick ? 'bold' : 'normal')};
`;