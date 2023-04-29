const { response } = require("express");
const UserModel = require("../models/user.model");
const bcrypt = require("bcrypt");
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
    users: async function (req, res) {
        // pagination
        let page = req.query.page || 1;
        let limit = req.query.limit || 10;
        let startIndex = (page - 1) * limit;
        try {
            const users = await UserModel.find().skip(startIndex).limit(limit);

            // no. of users available in database
            const totalUsers = await UserModel.countDocuments();
            let totalPages = Math.ceil(totalUsers / limit);

            // remove password from every user object
            const usersList = users.map(el => delete el.password);
            res.json({ usersList, totalPages, page });
        } catch (error) {
            console.log(error);
            res.status(500).send(error.message)
        }
    }
}