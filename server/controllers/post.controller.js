const postModel = require("../models/post.model");
const UserModel = require("../models/user.model")

module.exports = {

    // create post
    createPost: async (req, res) => {
        const payload = req.body;
        try {
            let post = new postModel(payload);

            // get the user to update post in userModal
            let user = await UserModel.findById(post.user);
            user.posts.push(post._id);

            // save user and post to DB
            await user.save();
            await post.save();

            res.status(200).send({ message: "post added successfully", post });
        } catch (e) {
            console.log(e);
            res.status(500).send({ message: e.message });
        }
    },

    // get all posts
    getAllPosts: async (req, res) => {
        try {
            let posts = await postModel.find();
            res.json(posts);
        } catch (error) {
            console.log(error);
            res.status(500).send({ message: error.message });
        }
    },

    // update post
    updatePost: async (req, res) => {
        let id = req.params.id;
        let payload = req.body;
        try {
            let post = await postModel.findByIdAndUpdate(id, payload);
            res.json({ message: "post is updated successfully", post });
        } catch (error) {
            console.log(error);
            res.status(500).send({ message: error.message });
        }
    },

    // delete post 
    deletePost: async (req, res) => {
        let id = req.params.id;
        try {
            // remove "post" from "posts" collection
            let post = await postModel.findByIdAndDelete(id);

            // find user using user id from "post"
            let user = await UserModel.findById(post.user);

            // remove post id from user's "post" array
            let index = user.posts.indexOf(post._id);
            if (index > -1) user.posts.splice(index, 1);
            else return res.status(404).send({ message: "post not found for this user" });

            // save updated user DB
            await user.save();
            res.json({ message: "post is deleted successfully" });

        } catch (error) {
            console.log(error);
            res.status(500).send({ message: error.message });
        }
    },

    // get specific post
    getPost: async (req, res) => {
        let id = req.params.id;
        try {
            try {
                let post = await postModel.findById(id);
                if (post) return res.json(post);
                else return res.status(404).send({ message: "post not found" });
            } catch (error) {
                console.log(error);
                res.status(500).send({ message: error.message });
            }
        } catch (error) {
            console.log(error);
            res.status(500).send({ message: error.message });
        }
    }

}