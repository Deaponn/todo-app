import styled from "styled-components";

const Button = styled.button`
float: right;
margin-right: 30px;
font-size: 20px;
color: ${({ active }) => (active ? "black" : "lightgrey")};
border: 3px solid ${({ active }) => (active ? "#7ABFCD" : "#F2BBBF")};
background-color: ${({ active }) => (active ? "#B5DBE3" : "#FBF0EF")};
cursor: ${({ active }) => (active ? "pointer" : "not-allowed")};
transition: border 0.2s, background-color 0.2s, color 0.2s;
`;

export default Button