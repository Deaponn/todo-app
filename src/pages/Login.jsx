import styled from "styled-components";
import Button from "../components/Button";
import { useState } from "react";

const Window = styled.div`
    width: min(80%, 500px);
    height: 280px;
    background-color: #B7B5E4;
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
        background-color: #B7B5E4;
        transition: border-bottom 0.2s;
    }

    & input:focus {
        border-bottom: 3px solid #cc2936;
    }
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

    const listenForEnter = (e) => {
        if (e.key === "Enter") sendLoginRequest()
    }

    return (
        <Window>
            <Inputs>
                <label htmlFor="login">Login</label>
                <input type="text" placeholder="login" id="login" value={login} onChange={(e) => setLogin(e.target.value)} onKeyPress={listenForEnter}/>
                <label htmlFor="password">Password</label>
                <input type="password" placeholder="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} onKeyPress={listenForEnter}/>
            </Inputs>
            <Button active={login.length !== 0 && password.length !== 0} onClick={() => sendLoginRequest()}>
                Login
            </Button>
        </Window>
    );
}
