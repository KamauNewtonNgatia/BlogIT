import express, { json } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {
  createPost,
  fetchAllPosts,
  fetchUserPosts,
  fetchSinglePost,
  deletePosts,
} from "./controllers/post.controllers.js";
import verifyToken from "./middleware/verifyToken.js";
import validatePost from "./middleware/validatePost.js";

// import { registerUser } from "./controllers/users.controllers";
// import { loginUser } from "./controllers/auth.controllers";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["POST", "PATCH", "GET", "PUT", "DELETE"],
    credentials: true,
  }),
);

const client = new PrismaClient();

app.use(cookieParser());

app.post("/user", async (req, res) => {
  try {
    const { firstName, lastName, username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 8);

    if (!username) {
      res.status(400).json("username is required");
      return;
    }

    if (!firstName) {
      res.status(400).json("firstname is required");
      return;
    }

    if (!lastName) {
      res.status(400).json("lastname is required");
      return;
    }

    if (!email) {
      res.status(400).json("email is required");
      return;
    }
    if (!password) {
      res.status(400).json("password is required");
      return;
    }

    const userWithEmail = await client.user.findFirst({
      where: { email: email },
    });
    if (userWithEmail) {
      res.status(400).json({ message: "email already taken" });
      return;
    }

    const userWithusername = await client.user.findFirst({
      where: { username: username },
    });
    if (userWithusername) {
      res.status(400).json({ message: "username already taken" });
      return;
    }

    const newUser = await client.user.create({
      data: {
        firstName,
        lastName,
        username,
        email,
        password: hashedPassword,
      },
    });

    res.status(200).json(newUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/auth/login", verifyToken, async (req, res) => {
  try {
    console.log(req.body);
    console.log(req.userId);
    const userId = req.userId;
    const { email, password } = req.body;

    const user = await client.user.findFirst({
      where: { email: email },
    });
    if (!user) {
      res.status(401).json({ message: "wrong email or password" });
      return;
    }

    const passwordsMatch = await bcrypt.compare(password, user.password);
    if (passwordsMatch === false) {
      res.status(401).json({ message: "wrong email or password" });
      return;
    }
    //implement json web token
    const token = jwt.sign(user.id, process.env.JWT_SECRET);
    console.log("logged in ");
    res.status(200).cookie("authToken", token, { httpOnly: true }).json(user);
  } catch (e) {
    res.status(500).json({ message: "something went wrong, please try again" });
  }
});

//routes

app.post("/posts", verifyToken, validatePost, createPost);
app.get("/posts/user/:userId", verifyToken, fetchUserPosts);
app.get("/posts/:id", verifyToken, fetchSinglePost);
app.get("/posts", verifyToken, fetchAllPosts);
app.delete("/posts/postId", verifyToken, deletePosts);

//server
app.listen(4000, () => console.log(`server running...`));
