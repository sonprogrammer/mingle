import tw, { styled } from "twin.macro";

export const Content = styled.div`
    ${tw`flex justify-between items-center`}
    padding: 50px 0;
`;
export const Divider = styled.div`
    ${tw`mx-auto h-[1px]`}
    width: 98%;
    border: 1px solid #ccc;
`