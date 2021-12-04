const { Campground } = require("../model/schema");
const { Review } = require("../model/ReviewsSchema");

const getAll = async () => {
	const result = await Campground.find();
	return result;
};

const getById = async (id) => {
	const result = await Campground.findOne({ _id: id });
	return result;
};

const createNewCamp = async (camp) => {
	const newCamp = new Campground(camp);
	const isSuccess = await newCamp.save({ validateBeforeSave: true });
	if (isSuccess) return newCamp;
	return false;
};

const updateCamp = async (updatedCampData, exisitingCampID) => {
	const campgroundToUpdate = await Campground.findOneAndUpdate({ _id: exisitingCampID }, { ...updatedCampData }, { runValidators: true });
	if (campgroundToUpdate) return true;
	return false;
};

const deleteCamp = async (id) => {
	const isDeleted = await Campground.findByIdAndDelete(id);
	if (isDeleted) return true;
	return false;
};

const createNewReviewForACamp = async (review, campgroundID) => {
	const newReview = await new Review(review);
	const campToReview = await getById(campgroundID);
	const isSaved = campToReview.reviews.push(newReview);
	await campToReview.save({ validateBeforeSave: true });
	if (isSaved) return true;
	return false;
};
module.exports = { getAll, getById, createNewCamp, updateCamp, deleteCamp, createNewReviewForACamp };
