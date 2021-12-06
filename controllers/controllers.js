const { Campground } = require("../model/campgroundsSchema");
const { Review } = require("../model/ReviewsSchema");

const getAll = async () => {
	const result = await Campground.find();
	return result;
};

const getById = async (id) => {
	const result = await Campground.findOne({ _id: id });
	return result;
};

const getByIdAndPopulate = async (id, field) => {
	const result = await Campground.findOne({ _id: id }).populate(field);
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
	// create a review
	const newReview = await new Review(review);

	// find the camp to review, save the review on it
	const campToReview = await getById(campgroundID);
	const isSaved = campToReview.reviews.push(newReview);

	// save both the camp and the review
	await Promise.all[(newReview.save({ validateBeforeSave: true }), campToReview.save({ validateBeforeSave: true }))];
	if (isSaved) return true;
	return false;
};
module.exports = { getAll, getById, getByIdAndPopulate, createNewCamp, updateCamp, deleteCamp, createNewReviewForACamp };
