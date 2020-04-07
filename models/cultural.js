var mongoose = require("mongoose");

var culturalSchema = new mongoose.Schema({
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

module.exports = mongoose.model("Cultural", culturalSchema);