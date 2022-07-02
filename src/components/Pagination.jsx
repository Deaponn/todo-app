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
    ${({ isHidden }) => (isHidden ? "display: none !important;" : null)}
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

export default function Pagination({ page, setPage, pages }) {
    return (
        <Wrapper>
            <Circle arrow noBorder onClick={(e) => setPage(page - 1, e)}>
                {"<"}
            </Circle>
            {pages <= 5 && (
                <>
                    <Circle big={page === "1"} onClick={(e) => setPage(1, e)}>
                        1
                    </Circle>
                    <Circle big={page === "2"} onClick={(e) => setPage(2, e)} isHidden={pages < 2}>
                        2
                    </Circle>
                    <Circle big={page === "3"} onClick={(e) => setPage(3, e)} isHidden={pages < 3}>
                        3
                    </Circle>
                    <Circle big={page === "4"} onClick={(e) => setPage(4, e)} isHidden={pages < 4}>
                        4
                    </Circle>
                    <Circle big={page === "5"} onClick={(e) => setPage(5, e)} isHidden={pages < 5}>
                        5
                    </Circle>
                </>
            )}
            {pages > 5 && (
                <>
                    <Circle big={page === "1"} onClick={(e) => setPage(1, e)}>
                        1
                    </Circle>
                    <Circle noBorder={page > 3} big={page === "2"} onClick={(e) => (page <= 2 ? setPage(2, e) : null)}>
                        {page <= 3 ? "2" : "⋯"}
                    </Circle>
                    <Circle
                        big={page >= 3 && page <= pages - 2}
                        onClick={(e) => {
                            if (page < 3) setPage(3, e);
                            if (page > pages - 2) setPage(pages - 2, e);
                        }}
                    >
                        {page <= 3 ? 3 : page >= pages - 2 ? pages - 2 : page}
                    </Circle>
                    <Circle noBorder={page < pages - 2} big={page === `${pages - 1}`} onClick={(e) => (page >= pages - 2 ? setPage(pages - 1, e) : null)}>
                        {page >= pages - 2 ? pages - 1 : "⋯"}
                    </Circle>
                    <Circle big={page === `${pages}`} onClick={(e) => setPage(pages, e)}>
                        {pages}
                    </Circle>
                </>
            )}
            <Circle arrow noBorder onClick={(e) => setPage(parseInt(page) + 1, e)}>
                {">"}
            </Circle>
        </Wrapper>
    );
}
