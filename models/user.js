const mongoose = require("mongoose");
var passportlocalmongoose = require("passport-local-mongoose");

var userSchema = new mongoose.Schema({
	usernmae: String,
	password: String
});

userSchema.plugin(passportlocalmongoose);
module.exports = mongoose.model("users", userSchema);