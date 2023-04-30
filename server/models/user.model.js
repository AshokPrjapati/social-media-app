const { Schema, model } = require("mongoose");

const userSchema = Schema({
    name: String,
    email: String,
    password: String,
    dob: Date,
    bio: String,
    posts: [{ type: Schema.Types.ObjectId, ref: 'post' }],
    friends: [{ type: Schema.Types.ObjectId, ref: 'user' }],
    friendRequests: [{ type: Schema.Types.ObjectId, ref: 'user' }]
});

const UserModel = model("user", userSchema);

module.exports = UserModel