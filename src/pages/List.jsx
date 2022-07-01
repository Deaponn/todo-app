import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import Pagination from "../components/Pagination";
import Todo from "../components/Todo";

const Layout = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100vw;
    height: 100vh;
`;

const Header = styled.div`
    width: 85%;
    height: 60px;
    border-bottom: 3px solid black;
    border-radius: 3px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 20px;
    margin-bottom: 20px;
`;

const Window = styled.div`
    width: 80%;
    height: 80%;
    background-color: #b5ffe1;
    border-radius: 3px;
    font-size: 20px;
    padding: 30px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
`;

export default function List({ onLogout }) {
    const [searchParams, setSearchParams] = useSearchParams();
    const [todos, setTodos] = useState();
    const setPage = useCallback(
        (newPage, e) => {
            if (e && (e.detail > 1 || newPage === 0 || newPage === 11)) return;
            setSearchParams(new URLSearchParams({ page: newPage }));
        },
        [setSearchParams]
    );

    useEffect(() => {
        async function fetchItems(page, perPage = 4) {
            const response = await fetch(`http://localhost:8080/todos?page=${page}&per_page=${perPage}`);
            const items = await response.json();
            if (!items.success && items.error === "Permission denied") onLogout();
            setTodos(items);
        }

        const page = searchParams.get("page");
        if (!page) return setPage(1);

        fetchItems(page);
    }, [searchParams, setPage, onLogout]);

    return (
        <Layout>
            <Header>
                <div>Username</div>
                <div onClick={() => onLogout()}>Logout</div>
            </Header>
            <Window>
                {todos && todos.map((todo) => <Todo key={todo.id} todo={todo} />)}
                <Pagination page={searchParams.get("page")} setPage={(page, e) => setPage(page, e)} />
            </Window>
        </Layout>
    );
}
