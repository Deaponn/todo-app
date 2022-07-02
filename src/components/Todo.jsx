import styled from "styled-components";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

const Wrapper = styled.div`
    width: 100%;
    height: calc(25% - 20px - 10px - 10px);
    border: 3px solid black;
    box-sizing: border-box;
`;

const Buttons = styled.div`
    height: 32px;
`;

export default function Todo({ todo: { id, name }, onDelete }) {
    const navigate = useNavigate()

    return (
        <Wrapper>
            {name}
            <Buttons>
                <Button active onClick={() => onDelete()}>X</Button>
                <Button active onClick={() => navigate(`/diagram?todo_id=${id}`)}>EDIT</Button>
            </Buttons>
        </Wrapper>
    );
}
