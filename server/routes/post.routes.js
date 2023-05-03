const express = require("express");
const { getAllPosts } = require("../controllers/post.controller");
const postRoute = express.Router();

postRoute.get("/posts", getAllPosts);

module.exports = postRoute;