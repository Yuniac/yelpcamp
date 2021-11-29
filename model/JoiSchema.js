const Joi = require("joi");

const joiSchema = Joi.object({
	title: Joi.string().required().trim().error(new Error("Campground title can't be empty")),
	price: Joi.number().required().integer().min(0).error(new Error("Campground price must be a number greater than 0")),
	description: Joi.string().required().error(new Error("Campground description is needed")),
	location: Joi.string().required().error(new Error("Campground must have a valid location")),
	image: Joi.string()
		.required()
		.pattern(new RegExp(/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/))
		.error(new Error("Please provide a valid image link")),
});

module.exports.joiSchema = joiSchema;
