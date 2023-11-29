import { styled } from "twin.macro";

export const Wrapper = styled.div`
    background: #e0e0e0;
    width: 70vw;
    height: 80vh;
    margin: 0 auto;
    padding: 16px;
    overflow-y: scroll;
    &::-webkit-scrollbar {
        display: none;
      }
`;
