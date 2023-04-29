const express = require("express");
const { register, getUsers, getFriends, sendRequest, updateRequest } = require("../controllers/user.controller");
const userRoute = express.Router();

userRoute.post("/register", register);
userRoute.get("/users", getUsers);
userRoute.get("/users/:id/friends", getFriends);
userRoute.post("/users/:id/friends", sendRequest);
userRoute.patch("/users/:id/friends/:friendId", updateRequest);

module.exports = userRoute;