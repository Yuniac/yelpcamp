const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const campgroundSchema = new Schema({
	title: {
		required: true,
		type: String,
		trim: true,
	},
	price: {
		required: false,
		type: String,
	},
	description: {
		required: false,
		type: String,
	},
	location: {
		required: true,
		type: String,
	},
});

const campground = mongoose.model("Campground", campgroundSchema);

module.exports.Campground = campground;
