const postModel = require("../models/post.model");

module.exports = {

    // get all posts
    getAllPosts: async () => {
        try {
            let posts = await postModel.find();
            res.json(posts);
        } catch (error) {
            console.log(error);
            res.status(500).send({ message: error.message });
        }
    }

}