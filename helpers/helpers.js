const { joiSchema } = require("../model/JoiSchema");

const isFormValid = (rules) => {
	// const regex = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
	const { name, location, img, description, price } = rules;
	if (name.length && location.length && price && typeof price === Number && price > 0 && img.length && description.length) {
		return true;
	}
	return false;
};

const isFormValidBackend = (req, res, next) => {
	const data = req.body.campground;
	const isValidCamp = joiSchema.validate(data);
	const { error } = isValidCamp;
	if (!error) {
		req.newCamp = data;
		next();
	} else {
		next(new Error(error));
	}
};

module.exports.isFormValid = isFormValid;
module.exports.isFormValidBackend = isFormValidBackend;
