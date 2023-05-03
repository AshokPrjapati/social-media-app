const express = require("express");
const { getAllPosts, createPost } = require("../controllers/post.controller");
const postRoute = express.Router();

postRoute.get("/posts", getAllPosts);
postRoute.post("/post", createPost);

module.exports = postRoute;