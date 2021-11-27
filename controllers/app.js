const { Campground } = require("../model/schema");
const getAll = async () => {
	const result = await Campground.find();
	return result;
};
const getById = async (id) => {
	const result = await Campground.findById(id);
	return result;
};
const createNewCamp = async (camp) => {
	const { title } = camp;
	const newCamp = new Campground(camp);
	await newCamp.save({ validateBeforeSave: true });
	const isSuccess = Campground.exists({ title: title });
	if (isSuccess) return newCamp;
	return false;
};

const updateCamp = async (updatedCampData, exisitingCampID) => {
	const campgroundToUpdate = await Campground.findOneAndUpdate({ _id: exisitingCampID }, { ...updatedCampData }, { runValidators: true });
	if (campgroundToUpdate) return true;
	return false;
};

const deleteCamp = async (id) => {
	const isDeleted = await Campground.deleteOne({ id: id });
	if (isDeleted) return true;
	return false;
};
module.exports = { getAll, getById, createNewCamp, updateCamp, deleteCamp };
