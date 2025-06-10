const express = require("express");
const zod = require("zod");
const { email } = require("zod/v4");

const app = express();

app.use(express.json());

app.post("/login", (req, res) => {
  const schema = zod.object({
    email: zod.string().email(),
    password: zod.string().min(8),
  });

  const data = req.body;

  const validationOutput = schema.safeParse(data);

  if (!validationOutput.success) {
    res.status(411).json(validationOutput);
  } else {
    res.status(200).json({
      msg: "The inputs look good for zod..",
    });
  }
});

app.use((err, req, res, next) => {
  res.json({
    msg: "something went wrong...",
  });
});

app.listen(3000, () => {
  console.log("Server started");
});
