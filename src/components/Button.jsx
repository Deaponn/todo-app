import styled from "styled-components";

const Button = styled.button`
float: right;
margin-right: 30px;
font-size: 20px;
color: ${({ active }) => (active ? "black" : "lightgrey")};
border: 3px solid ${({ active }) => (active ? "#322E18" : "#F2BBBF")};
background-color: ${({ active }) => (active ? "#E2E5F3" : "#FBF0EF")};
cursor: ${({ active }) => (active ? "pointer" : "not-allowed")};
transition: border 0.2s, background-color 0.2s, color 0.2s;
`;

export default Button