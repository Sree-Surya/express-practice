const express = require("express");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const zod = require("zod");

const mongoose = require("mongoose");

dotenv.config();

mongodbConnectionString = process.env.MONGODB_URL;
const JWT_PASSWORD = process.env.JWT_PASSWORD;

mongoose.connect(mongodbConnectionString);
const User = mongoose.model("Users", {
  username: String,
  email: String,
  password: String,
});

const USERS_INFO = [
  {
    username: "surya",
    password: "12345",
    mail: "email1@gmail.com",
  },
  {
    username: "someone",
    password: "7891011",
    mail: "someone@gmail.com",
  },
];

app = express();

app.use(express.json());

function userExistsInMemory(username, password) {
  let userExists = false;
  USERS_INFO.find((data) => {
    if (data.username == username && data.password == password) {
      userExists = true;
    }
  });
  return userExists;
}

function validateSignupInfo(req, res, next) {
  const data = req.body;
  const schema = zod.object({
    username: zod.string(),
    email: zod.string().email(),
    password: zod.string().min(5),
  });

  const parsedOutput = schema.safeParse(data);

  if (!parsedOutput.success) {
    res.status(411).json({
      msg: parsedOutput?.error?.message,
    });
    return;
  } else {
    next();
  }
}

app.post("/signup", validateSignupInfo, async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({
        msg: "User already exists in database.",
      });
      return;
    }

    const newUser = new User({ username, password, email });

    await newUser.save();

    res.status(201).json({
      msg: "User created successfully",
    });
  } catch (err) {
    res.status(500).json({
      msg: "Internal server error.",
    });
  }
});

app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (!userExistsInMemory(username, password)) {
    res.status(403).json({
      msg: "User does not exist. Please sign up first",
    });
    return;
  }

  const token = jwt.sign({ username }, JWT_PASSWORD);

  res.json({
    token,
  });
});

app.get("/users", (req, res) => {
  const token = req.headers.authorization;

  try {
    const decoded = jwt.verify(token, JWT_PASSWORD);
    const username = decoded.username;

    res.status(200).json({
      users: USERS_INFO.filter((data) => {
        if (data.username == username) {
          return false;
        }
        return true;
      }),
    });
  } catch (err) {
    res.status(403).json({
      msg: "Invalid token",
    });
  }
});

app.listen(3000, () => {
  console.log("The server has started in port 3000");
});
