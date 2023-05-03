const express = require("express");
const { getAllPosts, createPost, updatePost, deletePost, getPost } = require("../controllers/post.controller");
const postRoute = express.Router();

postRoute.get("/posts", getAllPosts);
postRoute.post("/post", createPost);
postRoute.patch("/post/:id", updatePost);
postRoute.delete("/post/:id", deletePost);
postRoute.get("/posts/:id", getPost);

module.exports = postRoute;