const express = require("express");
const { getAllPosts, createPost, updatePost, deletePost } = require("../controllers/post.controller");
const postRoute = express.Router();

postRoute.get("/posts", getAllPosts);
postRoute.post("/post", createPost);
postRoute.patch("/post/:id", updatePost);
postRoute.delete("/post/:id", deletePost);

module.exports = postRoute;