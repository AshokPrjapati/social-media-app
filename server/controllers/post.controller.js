const postModel = require("../models/post.model");

module.exports = {

    // create post
    createPost: async (req, res) => {
        const payload = req.body;
        try {
            let post = new postModel(payload);
            await post.save();
            res.status(200).send({ message: "post added successfully" });
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
    }

}