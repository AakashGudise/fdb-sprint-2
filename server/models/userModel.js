
// const mongoose = require('mongoose');


// const UserModel = mongoose.model('user', {
//     title: String,
//     description: String,
// });

// module.exports = UserModel


const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    age: Number,
    password : String,
});

const UserModule = mongoose.model("usersData", UserSchema);

module.exports = UserModule;
