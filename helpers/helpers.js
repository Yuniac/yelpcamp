const { campGroundJOISchema, reviewsJOISchema } = require("../model/JoiSchemas");

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
		const err = new Error();
		err.message =
			error ||
			"Something went wrong... please check the information you entered an that you have permissions to add new campgrounds.";
		err.status = 401;
		err.refer = `/campgrounds/new`;
		next(err);
	}
};

const isReviewValidBackend = (req, res, next) => {
	const { id } = req.params;
	const review = req.body.review;
	const isValidReview = reviewsJOISchema.validate(review);
	const { error } = isValidReview;
	if (!error) {
		req.body.newReview = review;
		next();
	} else {
		const err = new Error();
		err.message = error || "Something went wrong... please make sure your review is valid";
		err.status = 401;
		err.refer = `/campgrounds/${id}`;
		next(err);
	}
};

const setupLocals = (req, res, next) => {
	res.locals.success = req.flash("success") || undefined;
	res.locals.error = req.flash("error") || undefined;
	next();
};

module.exports = { isFormValidBackend, isReviewValidBackend, setupLocals };
