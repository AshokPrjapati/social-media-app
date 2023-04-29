const { Schema, Model } = require("mongoose");

const postSchema = Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    text: String,
    image: String,
    createdAt: Date,
    likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    comments: [{
        user: { type: Schema.Types.ObjectId, ref: 'User' },
        text: String,
        createdAt: Date
    }]
});

const postModel = Model("post", postSchema);

module.exports = postModel