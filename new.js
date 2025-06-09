const express = require("express");

const app = express();
const PORT = 3000;

function sum(n) {
  let ans = 0;
  for (let i = 1; i <= n; i++) {
    ans += i;
  }

  return ans;
}

app.get("/", (req, res) => {
  res.send("Hi there.");
});

app.get("/sum", (req, res) => {
  n = req.query.n;

  const ans = sum(n);
  res.send(ans.toString());
});

app.listen(PORT, () => {
  console.log(`The server has started in port ${PORT}`);
});
