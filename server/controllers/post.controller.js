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
    },

    // update post
    updatePost: async (req, res) => {
        let _id = req.params.id;
        let payload = req.body;
        try {
            let post = await postModel.findByIdAndUpdate({ _id }, payload);
            console.log(post);
            res.json({ message: "post is updated successfully" });
        } catch (error) {
            console.log(error);
            res.status(500).send({ message: error.message });
        }
    }

}