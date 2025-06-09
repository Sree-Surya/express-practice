const express = require("express");
const bodyParser = require("body-parser");

const port = 3000;
const app = express();

app.use(bodyParser.json());

app.get("/", (req, res) => {
  console.log("headers: --");
  console.log(req.headers);
  console.log("body: --");
  console.log(req.body);
  res.send("Hello world!!");
});

app.listen(port, () => {
  console.log(`Server started on ${port}`);
});
