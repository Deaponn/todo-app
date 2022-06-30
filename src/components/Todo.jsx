import styled from "styled-components";
import Button from "./Button";

const Wrapper = styled.div`
    width: 100%;
    height: calc(25% - 20px);
    border: 3px solid black;
    box-sizing: border-box;
`;

const Buttons = styled.div``;

export default function Todo({ todo: { name } }) {
    return (
        <Wrapper>
            {name}
            <Buttons>
                <Button active>EDIT</Button>
                <Button active>X</Button>
            </Buttons>
        </Wrapper>
    );
}
