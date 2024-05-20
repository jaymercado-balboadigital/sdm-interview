require("dotenv").config();
const express = require("express");
const app = express();
const port = 3000;

const indexRouter = require("./routes/index");

app.use("/", indexRouter);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
