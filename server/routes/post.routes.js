const express = require("express");
const { getAllPosts, createPost, updatePost } = require("../controllers/post.controller");
const postRoute = express.Router();

postRoute.get("/posts", getAllPosts);
postRoute.post("/post", createPost);
postRoute.patch("/post/:id", updatePost);

module.exports = postRoute;