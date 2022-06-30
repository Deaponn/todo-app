import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";

export default function List({ onLogout }) {
    const [searchParams, setSearchParams] = useSearchParams();
    const [todos, setTodos] = useState()

    useEffect(() => {
        async function fetchItems(page, perPage = 4){
            const response = await fetch(`http://localhost:8080/todos?page=${page}&per_page=${perPage}`)
            const items = await response.json()
            if (!items.success && items.error === "Permission denied") onLogout()
            setTodos(items)
        }

        const page = searchParams.get("page")
        if (!page) return setSearchParams(new URLSearchParams({ page: "1" }));

        fetchItems(page)
    }, [searchParams, setSearchParams]);

    return <div onClick={() => onLogout()}>list</div>;
}
