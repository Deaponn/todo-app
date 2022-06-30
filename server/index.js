const express = require("express");
const cors = require("cors");
const todos = require("./todos.json");

const app = express();
app.use(cors());
const port = process.env.PORT || 8080;

let isLogged = false;

app.get("/", (req, res) => {
    const { login, password } = req.query;

    if (login === "user" && password === "pass") {
        isLogged = true;

        return res.send(
            JSON.stringify({
                success: true,
            })
        );
    }

    res.send(JSON.stringify({ success: false, error: "Wrong username or password" }));
});

app.get("/logout", (req, res) => {
    isLogged = false;
    res.send(JSON.stringify({ success: true }));
});

app.get("/todos", (req, res) => {
    if (!isLogged) return res.send(JSON.stringify({ success: false, error: "Permission denied" }));
    const { page, per_page } = req.query;
    if (page && per_page) {
        const start = (page - 1) * per_page
        const pageOfTodos = todos.slice(start, parseInt(start) + parseInt(per_page));
        return res.send(JSON.stringify(pageOfTodos));
    }
    res.send(JSON.stringify({ success: "false", error: "Missing page and per_page query parameters" }));
});

app.listen(port, () => {
    console.log(`Server is running at https://localhost:${port}`);
});
