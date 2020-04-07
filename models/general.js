var mongoose = require("mongoose");

var generalSchema = new mongoose.Schema({
	name: String,
	venue: String,
	date: String, 
    description: String,
    registration_link: String,
    author: {
		id:{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Users"
		},
		username : String
	}
})

module.exports = mongoose.model("General", generalSchema);