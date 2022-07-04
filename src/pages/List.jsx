import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import Button from "../components/Button";
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
    margin-bottom: 70px;
    color: #fbf0ef;
    padding: 0 20px;
`;

const Window = styled.div`
    width: 80%;
    background-color: #b5ffe1;
    border-radius: 3px;
    font-size: 20px;
    padding: 20px 30px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
`;

const ListHeader = styled.div`
    width: 100%;
    font-size: 30px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
`;

const TodoCreate = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    & input {
        border: none;
        border-bottom: 3px solid black;
        background-color: #b5ffe1;
        border-radius: 3px;
        margin-right: 10px;
    }
`;

const Todos = styled.div`
    height: 360px;
    width: 100%;
    display: flex;
    flex-direction: column;
`;

export default function List({ onLogout }) {
    const [searchParams, setSearchParams] = useSearchParams();
    const [todos, setTodos] = useState();
    const [pages, setPages] = useState();
    const [name, setName] = useState("");
    const setPage = useCallback(
        (newPage, e) => {
            if (e && (e.detail > 1 || newPage === 0 || newPage > pages)) return;
            setSearchParams(new URLSearchParams({ page: newPage }));
        },
        [setSearchParams, pages]
    );

    const fetchItems = useCallback(
        async (page, perPage = 4) => {
            const response = await fetch(`http://localhost:8080/todos?page=${page}&per_page=${perPage}`);
            const items = await response.json();
            if (!items.success && items.error === "Permission denied") onLogout();
            if (items.pageOfTodos.length === 0 && page > 1) return setPage(page - 1);
            setTodos(items.pageOfTodos);
            setPages(items.pages);
        },
        [onLogout, setPage]
    );

    const deleteTodo = useCallback(
        async (id) => {
            await fetch(`http://localhost:8080/todos?id=${id}`, { method: "DELETE" });
            fetchItems(searchParams.get("page"));
        },
        [searchParams, fetchItems]
    );

    const addTodo = useCallback(
        async (name) => {
            await fetch(`http://localhost:8080/todos`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: JSON.stringify({ name }),
            });
            fetchItems(searchParams.get("page"));
        },
        [fetchItems, searchParams]
    );

    useEffect(() => {
        const page = searchParams.get("page");
        if (!page) return setPage(1);

        fetchItems(page);
    }, [searchParams, setPage, onLogout, fetchItems]);

    return (
        <Layout>
            <Header>
                <div>Username</div>
                <div onClick={() => onLogout()}>Logout</div>
            </Header>
            <Window>
                <ListHeader>
                    <div>List of TODOs</div>
                    <TodoCreate>
                        <input type="text" placeholder="Todo name..." value={name} onChange={(e) => setName(e.target.value)} />
                        <Button active onClick={() => addTodo(name)}>
                            ADD
                        </Button>
                    </TodoCreate>
                </ListHeader>
                <Todos>
                    {todos && todos.map((todo) => <Todo key={todo.id} todo={todo} onDelete={() => deleteTodo(todo.id)} />)}
                    {todos && todos.length === 0 && <>the list is empty</>}
                </Todos>
                <Pagination page={searchParams.get("page")} setPage={(page, e) => setPage(page, e)} pages={pages} />
            </Window>
        </Layout>
    );
}
