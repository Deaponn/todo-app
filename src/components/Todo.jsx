import styled from "styled-components";

const Wrapper = styled.div`
    width: 100%;
    height: calc(25% - 20px);
    border: 3px solid black;
    box-sizing: border-box;
`;

export default function Todo({ todo: { name } }) {
    return <Wrapper>{name}</Wrapper>;
}
