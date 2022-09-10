var mongoose = require("mongoose");

var postSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
	},
	desc: {
		type: String,
		required: true,
	},
	img_url: {
		type: String,
		required: true,
	},
	img_name: {
		type: String,
		required: true,
	},
});

module.exports = new mongoose.model("Post", postSchema);
