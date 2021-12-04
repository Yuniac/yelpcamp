const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewsSchema = new Schema({
	body: {
		type: String,
		required: true,
	},
	rating: {
		type: Number,
		required: true,
	},
});

const Review = mongoose.model("Review", reviewsSchema);

module.exports = { Review };
