import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Diagram from "./pages/Diagram";
import Login from "./pages/Login";
import List from "./pages/List";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    body {
        background-color: red;
        margin: 0;
        padding: 0;
    }
`;

export default function App() {
    return (
            <Router>
                <GlobalStyle />
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/list" element={<List />} />
                    <Route path="/diagram" element={<Diagram />} />
                </Routes>
            </Router>
    );
}
