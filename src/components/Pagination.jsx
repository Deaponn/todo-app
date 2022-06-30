import styled from "styled-components";
import { device } from "../constants/breakpoints";

const Wrapper = styled.div`
    height: 40px;
    width: min(300px, 100%);
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const Circle = styled.div`
    height: ${({ big }) => (big ? "30px" : "25px")};
    width: ${({ big }) => (big ? "30px" : "25px")};
    ${({ noBorder }) => (noBorder ? null : "border: 3px solid black;")}
    ${({ arrow }) => (arrow ? "font-size: 30px;" : null)}
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;

    @media ${device.tablet} {
        height: ${({ big }) => (big ? "35px" : "30px")};
        width: ${({ big }) => (big ? "35px" : "30px")};
    }
`;

export default function Pagination({ page, setPage }) {
    return (
        <Wrapper>
            <Circle arrow noBorder onClick={(e) => setPage(page - 1, e)}>
                {"<"}
            </Circle>
            <Circle big={page === "1"} onClick={(e) => setPage(1, e)}>
                1
            </Circle>
            <Circle noBorder={page > 3} big={page === "2"} onClick={(e) => (page <= 2 ? setPage(2, e) : null)}>
                {page <= 3 ? "2" : "⋯"}
            </Circle>
            <Circle
                big={page >= 3 && page <= 8}
                onClick={(e) => {
                    if (page < 3) setPage(3, e);
                    if (page > 8) setPage(8, e);
                }}
            >
                {page <= 3 ? 3 : page >= 8 ? 8 : page}
            </Circle>
            <Circle noBorder={page < 8} big={page === "9"} onClick={(e) => (page >= 8 ? setPage(9, e) : null)}>
                {page >= 8 ? "9" : "⋯"}
            </Circle>
            <Circle big={page === "10"} onClick={(e) => setPage(10, e)}>
                10
            </Circle>
            <Circle arrow noBorder onClick={(e) => setPage(parseInt(page) + 1, e)}>
                {">"}
            </Circle>
        </Wrapper>
    );
}
