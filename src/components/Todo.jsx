import styled from "styled-components";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

const Wrapper = styled.div`
    width: 100%;
    height: 70px;
    border: 3px solid #1C190D;
    box-sizing: border-box;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    padding-left: 30px;
    margin: 10px 0;
`;

const Buttons = styled.div`
    height: 32px;
    display: flex;
    margin-left: auto;
`;

export default function Todo({ todo: { id, name }, onDelete }) {
    const navigate = useNavigate()

    return (
        <Wrapper>
            Title: {name}
            <Buttons>
                <Button style={{marginRight: "10px"}} active onClick={() => navigate(`/diagram?todo_id=${id}`)}>EDIT</Button>
                <Button style={{marginRight: "10px"}} active onClick={() => onDelete()}>X</Button>
            </Buttons>
        </Wrapper>
    );
}
