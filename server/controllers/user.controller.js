const { response } = require("express");
const UserModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const { isValidObjectId } = require("mongoose");
require("dotenv").config();

module.exports = {

    // registering user to database
    register: async function (req, res) {
        let { email, password } = req.body;
        try {
            // checking if user already exists or not
            const user = await UserModel.findOne({ email });
            if (user) return res.stauts(401).send({ message: "user already exists" });

            // hashing the password
            let saltRounds = process.env.SALT_ROUNDS;
            try {
                let hash = await bcrypt.hash(password, saltRounds);
                password = hash;
            } catch (error) {
                res.status(500).send("Something went wrong while hashing the password");
            }

            // registering the user to database
            let newUser = new UserModel(req.body);
            await newUser.save();

            // removing the password field from the user object
            delete newUser.password;
            res.json({ user: newUser, message: "user registered succesfully" });

        } catch (error) {
            console.log(error);
            res.status(500).send(error.message);
        }
    },


    // send list of all regiseted users
    getUsers: async function (req, res) {
        // pagination
        let page = req.query.page || 1;
        let limit = req.query.limit || 10;
        let startIndex = (page - 1) * limit;
        try {
            const users = await UserModel.find().select('-password').skip(startIndex).limit(limit);

            // no. of users available in database
            const totalUsers = await UserModel.countDocuments();
            let totalPages = Math.ceil(totalUsers / limit);

            res.json({ users, totalPages, page });
        } catch (error) {
            console.log(error);
            res.status(500).send(error.message)
        }
    },

    getFriends: async function (req, res) {
        let id = req.query.id;
        let page = req.query.page || 1;
        let limit = req.query.limit || 10;
        let startIndex = (page - 1) * limit;

        // check for id is valid or not
        if (!isValidObjectId(id)) return res.status(400).send({ message: "invalid user id" });

        try {
            // retrieve user with its friends data
            let user = await UserModel.findById(id).select('-password').populate({
                path: "friends",
                options: {
                    select: "-password",
                    skip: startIndex,
                    limit: limit,
                }
            });

            // check for user is present or not in DB
            if (!user) return res.status(404).send({ message: "user not found" });

            // get total number of friends
            const totalFriends = await UserModel.countDocuments({ _id: { $in: user.friends } });
            let totalPages = Math.ceil(totalFriends / limit);

            // result
            const friends = user.friends;

            res.json({ friends, totalPages, page });

        } catch (error) {
            console.log(error);
            res.status(500).send(error.message)
        }
    },

    sendRequest: async function (req, res) {
        let { userID, friendID } = req.body;
        // check for id is valid or not
        if (!isValidObjectId(userID) || !isValidObjectId(friendID)) return res.status(400).send({ message: "invalid user or requested person id" });

        try {
            // add friend request to friend account
            const friend = await UserModel.findById(friendID);
            friend.friendRequests.push(userID);
            await friend.save();
            res.status(201).send({ message: "friend request sent" });
        } catch (error) {
            console.log(error);
            res.status(500).send(error.message)
        }
    },

    updateRequest: async function (req, res) {
        let { status, userID, senderID } = req.body;
        // check for id is valid or not
        if (!isValidObjectId(userID) || !isValidObjectId(senderID)) return res.status(400).send({ message: "invalid user or sender id" });

        try {
            // requsest accepted
            if (status) {
                const user = await UserModel.findById(userID);
                // remove id from friendRequests path
                await user.friendRequests.findByIdAndDelete(senderID);
                // add person into friend who sent request
                user.friends.push(senderID);
                await user.save();

                // add person into friend who accept request
                const sender = await UserModel.findById(senderID);
                sender.friends.push(userID);
                await sender.save();

                res.status(204).send({ message: "requested accepted" })
            }
            // request rejected
            else {
                const user = await UserModel.findById(userID);
                // remove id from friendRequests path
                await user.friendRequests.findByIdAndDelete(senderID);
                await user.save();
                res.status(204).send({ message: "requested rejected" })
            }
        } catch (error) {
            console.log(error);
            res.status(500).send(error.message)
        }
    }

}