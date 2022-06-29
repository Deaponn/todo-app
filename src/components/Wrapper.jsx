import styled from "styled-components";

const WrapperElement = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: #08415C;
    ${({ center }) => (center ? "display: flex;" : null)}
    ${({ center }) => (center ? "justify-content: center;" : null)}
    ${({ center }) => (center ? "align-items: center;" : null)}
`;

export default function Wrapper({ children, center }) {
    return <WrapperElement center={center}>{children}</WrapperElement>;
}
