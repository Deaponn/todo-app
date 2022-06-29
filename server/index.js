const express = require("express")

const app = express();
const port = process.env.PORT || 8080;

app.get('/', (req, res) => {
  res.send('Express Server');
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});