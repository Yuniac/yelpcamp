const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const campgroundSchema = new Schema({
	title: {
		required: true,
		type: String,
		trim: true,
	},
	price: {
		required: true,
		type: Number,
	},
	description: {
		required: false,
		type: String,
	},
	location: {
		required: true,
		type: String,
	},
	image: {
		required: true,
		type: String,
	},
	reviews: [
		{
			type: Schema.Types.ObjectId,
			ref: "Review",
		},
	],
});

const campground = mongoose.model("Campground", campgroundSchema);

module.exports.Campground = campground;
