const { Schema, model } = require("mongoose");

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

const postModel = model("post", postSchema);

module.exports = postModel