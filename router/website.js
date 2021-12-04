const express = require("express");
const router = express.Router();

const {
	getAll,
	getById,
	getByIdAndPopulate,
	createNewCamp,
	updateCamp,
	deleteCamp,
	createNewReviewForACamp,
} = require("../controllers/controllers");

const { isFormValidBackend, isReviewValidBackend } = require("../helpers/helpers");
const { Campground, Review } = require("../model/ReviewsSchema");

// show all campgrounds
router.get("/", async (req, res, next) => {
	try {
		const campgrounds = await getAll();
		res.render("campgrounds/index", { campgrounds });
	} catch (err) {
		if (!err.message) {
			err.message = "Something went wrong, we can't access the campgrounds at the moment... please try again later";
			err.status = 500;
		}
		next(err);
	}
});

// creating a new campground [GET]
router.get("/new", async (req, res) => {
	res.render("campgrounds/new");
});

// creating a new campground [POST]
router.post("/", isFormValidBackend, async (req, res, next) => {
	try {
		const camp = req.newCamp;
		const isCampSaved = await createNewCamp({ ...camp });
		if (isCampSaved) res.redirect(`/campgrounds/${isCampSaved._id.toString()}`);
	} catch (err) {
		if (!err.message) {
			err.message = "Creating a new campground has failed... please check your input";
			err.status = 401;
			err.refer = "/campgrounds/new";
		}
		next(err);
	}
});

/*
 :id = camp._id
*/

// show a campground's page
router.get("/:id", async (req, res, next) => {
	try {
		const { id } = req.params;
		const campground = await getByIdAndPopulate(id, "reviews");
		res.render("campgrounds/show", { campground });
	} catch (err) {
		if (!err.message) {
			err.message = "No campground exist with that ID.";
			err.status = 404;
			err.refer = "/campgrounds";
		}
		next(err);
	}
});

// edit a campground [GET]
router.get("/:id/edit", async (req, res, next) => {
	try {
		const { id } = req.params;
		const campground = await getById(id);
		if (campground) res.render("campgrounds/edit", { campground });

		// old:
		// else next(new ExpressError("Prodcut not found", "404"));
		// up here we can see how throw ExpressError would work in an async function, just need to pass it in next() instead of throwing it on its own, this way, it will be caught by our app.use(err, req, res, next) error handler
	} catch (err) {
		if (!err.message) {
			err.message = "Editing the campground has failed, make sure you have the right permissions";
			err.status = 401;
			err.refer = `/campgrounds/${id}`;
		}
		next(err);
	}
});

// delete a campground
router.delete("/:id/delete", async (req, res, next) => {
	try {
		const { id } = req.params;
		const campground = await deleteCamp(id);
		if (campground) res.redirect("/campgrounds");
	} catch (err) {
		err.message = "Deleting the campground has failed... please check you have the right permissions or try again later.";
		err.status = 401;
		err.refer = `/campgrounds/${id}`;
		next(err);
	}
});

// edit a campground [PATCH]
router.patch("/:id/edit", isFormValidBackend, async (req, res, next) => {
	try {
		const camp = req.newCamp;
		const { id } = req.params;
		const isCampUpdated = await updateCamp(camp, id);
		if (isCampUpdated) res.redirect(`/campgrounds/${id}`);
		else res.redirect(`/campgrounds/${id}`);
	} catch (err) {
		err.message = "Editing the campground has failed... please check your input or try again later";
		err.status = 400;
		err.refer = `/campgrounds/${id}`;
		next(err);
	}
});

// add a camp review [POST]
router.post("/:id/review", isReviewValidBackend, async (req, res, next) => {
	try {
		const { id } = req.params;
		const { newReview } = req.body;
		const isReviewSaved = await createNewReviewForACamp(newReview, id);
		if (isReviewSaved) {
			res.redirect(`/campgrounds/${id}`);
		}
	} catch (err) {
		if (!err.message) {
			err.message = "Something went wrong... please try again later";
			err.status = 500;
			err.refer = `/campgrounds/${id}`;
		}
		next(err);
	}
});

// delete a review
router.delete("/:id/review/:review_id/delete", async (req, res, next) => {
	const { id, review_id } = req.params;
	await Review.findByIdAndDelete(review_id);
	await Campground.findByIdAndUpdate(id, { $pull: { reviews: review_id } });
	res.redirect(`/campgrounds/${id}`);
});

module.exports.router = router;
