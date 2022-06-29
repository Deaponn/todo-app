const express = require("express");
var cors = require("cors");

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

app.listen(port, () => {
    console.log(`Server is running at https://localhost:${port}`);
});
