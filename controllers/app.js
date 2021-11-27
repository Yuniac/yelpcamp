const { Campground } = require("../model/schema");
const getAll = async () => {
	const result = await Campground.find();
	return result;
};
const getById = async (id) => {
	const result = await Campground.findById(id);
	return result;
};
const createNewCamp = async ({ title, location }) => {
	const newCamp = new Campground({
		title: title,
		location: location,
	});
	await newCamp.save({ validateBeforeSave: true });
	const isSuccess = Campground.exists({ title: title });
	if (isSuccess) return newCamp;
	return false;
};

const updateCamp = async ({ title, location }, oldCamp) => {
	oldCamp.title = title;
	oldCamp.location = location;
	await oldCamp.save({ validateBeforeSave: true });
	return true;
};
module.exports = { getAll, getById, createNewCamp, updateCamp };
