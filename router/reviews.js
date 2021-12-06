const express = require("express");
const router = express.Router();

// schema
const { Review } = require("../model/ReviewsSchema");
const { Campground } = require("../model/campgroundsSchema");

// controllers/helpers
const { isReviewValidBackend } = require("../helpers/helpers");
const { createNewReviewForACamp } = require("../controllers/controllers");

// add a camp review [POST]
router.post("/:id/review", isReviewValidBackend, async (req, res, next) => {
	try {
		const { id } = req.params;
		const { newReview } = req.body;
		const isReviewSaved = await createNewReviewForACamp(newReview, id);
		if (isReviewSaved) {
			req.flash("success", "review has been added!");
			res.redirect(`/campgrounds/${id}`);
		}
	} catch (err) {
		if (!err.message) {
			err.message = "Something went wrong... please try again later";
			err.status = 500;
			err.refer = `/campgrounds/${id}`;
		} else {
			err.status = 500;
			err.refer = `/campgrounds/${id}`;
		}
		next(err);
	}
});

// delete a review
router.delete("/:id/review/:review_id/delete", async (req, res, next) => {
	try {
		const { id, review_id } = req.params;
		const isReviewDeleted = await Review.findByIdAndDelete(review_id);
		const isReviewDeletedFromItsParent = await Campground.findByIdAndUpdate(id, { $pull: { reviews: review_id } });
		if (isReviewDeleted && isReviewDeletedFromItsParent) {
			req.flash("success", "review has been deleted");
			res.redirect(`/campgrounds/${id}`);
		}
	} catch (err) {
		if (!err.message) {
			err.message = "Couldn't delete the review... you can only delete your own reviews";
			err.status = 401;
			err.refer = `/campgrounds/${id}`;
		} else {
			err.status = 500;
			err.refer = `/campgrounds/${id}`;
		}
		next(err);
	}
});

module.exports = { router };
