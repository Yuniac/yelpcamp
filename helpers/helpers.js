const { campGroundJOISchema, reviewsJOISchema } = require("../model/JoiSchema");

const isFormValid = (rules) => {
	// const regex = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
	const { name, location, img, description, price } = rules;
	if (name.length && location.length && price && typeof price === Number && price > 0 && img.length && description.length) {
		return true;
	}
	return false;
};

const isFormValidBackend = (req, res, next) => {
	const campground = req.body.campground;
	const isValidCamp = campGroundJOISchema.validate(campground);
	const { error } = isValidCamp;
	if (!error) {
		req.newCamp = campground;
		next();
	} else {
		next(new Error(error));
	}
};

const isReviewValidBackend = (req, res, next) => {
	const review = req.body.review;
	const isValidReview = reviewsJOISchema.validate(review);
	console.log(isValidReview);
	const { error } = isValidReview;
	if (!error) {
		req.body.newReview = review;
		next();
	} else {
		next(new Error(error));
	}
};

module.exports.isFormValidBackend = isFormValidBackend;
module.exports.isReviewValidBackend = isReviewValidBackend;
