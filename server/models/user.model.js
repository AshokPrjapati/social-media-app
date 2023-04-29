const { Schema, model } = require("mongoose");

const userSchema = Schema({
    name: String,
    email: String,
    password: String,
    dob: Date,
    bio: String,
    posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
    friends: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    friendRequests: [{ type: Schema.Types.ObjectId, ref: 'User' }]
});

const UserModel = model("user", userSchema);

module.exports = UserModel