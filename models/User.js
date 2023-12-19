const mongoose = require("mongoose");

const userSchema =new mongoose.Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String,
    email: String,
    gender: String,
    githubId: String,
    github : {
        id: String,
        nodeId: String,
        displayName: String,
        username: String,
        profileUrl: String,
        provider: String,
    }

})

const User = mongoose.model('User', userSchema)

module.exports= User