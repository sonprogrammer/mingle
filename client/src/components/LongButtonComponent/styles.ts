import tw, { styled } from "twin.macro";

export const StyledButton = styled.button`
    ${tw`w-full my-5 text-white focus:outline-none focus:ring-4 focus:ring-purple-300 font-bold rounded-full text-lg px-5 py-2.5 text-center`}
    background-color: #9b59b6;
    &:hover {
        opacity: 90%;
    }
`;