import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Diagram from "./pages/Diagram";
import Login from "./pages/Login";
import List from "./pages/List";
import { createGlobalStyle } from "styled-components";
import styled from "styled-components";

const GlobalStyle = createGlobalStyle`
    * {
        font-family: Lato;
    }

    html, body, #root {
        margin: 0;
        padding: 0;
        height: 100vh;
        width: 100vw;
    }
`;

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    background-color: ${({ bgColor }) => bgColor};
    ${({ center }) => (center ? "display: flex;" : null)}
    ${({ center }) => (center ? "justify-content: center;" : null)}
    ${({ center }) => (center ? "align-items: center;" : null)}
`;

export default function App() {
    const [isLogged, setIsLogged] = useState(false);
    useEffect(() => {
        const sessionLogin = sessionStorage.getItem("isLogged");
        if (sessionLogin === "true") setIsLogged(true);
    }, []);

    const LoginPage = (
        <Login
            onLogin={() => {
                setIsLogged(true);
                sessionStorage.setItem("isLogged", "true");
            }}
        />
    );

    return (
        <Router>
            <GlobalStyle />
            <Wrapper bgColor="#08415C" center>
                <Routes>
                    {!isLogged && <Route path="/" element={LoginPage} />}
                    <Route path="/login" element={LoginPage} />
                    {isLogged && <Route path="/" element={<List />} />}
                    <Route path="/list" element={<List />} />
                    <Route path="/diagram" element={<Diagram />} />
                </Routes>
            </Wrapper>
        </Router>
    );
}
