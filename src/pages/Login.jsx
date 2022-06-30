import styled from "styled-components";
import { useState } from "react";

const Window = styled.div`
    width: min(80%, 500px);
    height: 280px;
    background-color: #b5ffe1;
    border-radius: 3px;
    transform: translateY(-80px);
    font-size: 20px;
`;

const Inputs = styled.div`
    height: 220px;
    display: flex;
    flex-direction: column;
    padding-left: 30px;

    & > * {
        margin-top: 20px;
    }

    & input {
        border: 0px solid black;
        border-bottom: 3px solid black;
        border-radius: 3px;
        width: 70%;
        margin-top: 10px;
        font-size: 20px;
        background-color: #b5ffe1;
        transition: border-bottom 0.2s;
    }

    & input:focus {
        border-bottom: 3px solid #cc2936;
    }
`;

const Submit = styled.button`
    float: right;
    margin-right: 30px;
    font-size: 20px;
    color: ${({ active }) => (active ? "black" : "lightgrey")};
    border: 3px solid ${({ active }) => (active ? "#7ABFCD" : "#F2BBBF")};
    background-color: ${({ active }) => (active ? "#B5DBE3" : "#FBF0EF")};
    cursor: ${({ active }) => (active ? "pointer" : "not-allowed")};
    transition: border 0.2s, background-color 0.2s, color 0.2s;
`;

export default function Login({ onLogin }) {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");

    const sendLoginRequest = async () => {
        const response = await fetch(`http://localhost:8080?login=${login}&password=${password}`, {
            method: "GET",
            headers: { "Access-Control-Allow-Origin": "*" },
        });
        const data = await response.json();
        if (data.success) onLogin();
    };

    return (
        <Window>
            <Inputs>
                <label htmlFor="login">Login</label>
                <input type="text" placeholder="login" id="login" value={login} onChange={(e) => setLogin(e.target.value)} />
                <label htmlFor="password">Password</label>
                <input type="password" placeholder="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </Inputs>
            <Submit active={login.length !== 0 && password.length !== 0} onClick={() => sendLoginRequest()}>
                Login
            </Submit>
        </Window>
    );
}
