const express = require("express");
const router = express.Router();

const { getAll, getById, getByIdAndPopulate, createNewCamp, updateCamp, deleteCamp } = require("../controllers/controllers");

const { isFormValidBackend } = require("../helpers/helpers");

// show all campgrounds
router.get("/", async (req, res, next) => {
	try {
		const campgrounds = await getAll();
		res.render("campgrounds/index", { campgrounds });
	} catch (err) {
		if (!err.message) {
			err.message = "Something went wrong, we can't access the campgrounds at the moment... please try again later";
			err.status = 500;
		} else {
			err.status = 500;
			err.refer = `/`;
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
		if (isCampSaved) {
			req.flash("success", "campground created successfully!");
			res.redirect(`/campgrounds/${isCampSaved._id.toString()}`);
		}
	} catch (err) {
		if (!err.message) {
			err.message = "Creating a new campground has failed... please check your input";
			err.status = 401;
			err.refer = "/campgrounds/new";
		} else {
			err.status = 500;
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
		} else {
			err.status = 500;
			err.refer = "/campgrounds/";
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
			err.message =
				"Something went wrong... please try again later or make sure you have the right permissios to edit the campgrounds";
			err.status = 401;
			err.refer = `/campgrounds/${id}`;
		}
		next(err);
	}
});

// edit a campground [PATCH]
router.patch("/:id/edit", isFormValidBackend, async (req, res, next) => {
	try {
		const camp = req.newCamp;
		const { id } = req.params;
		const isCampUpdated = await updateCamp(camp, id);
		if (isCampUpdated) {
			req.flash("success", "campground has been updated successfully!");
			res.redirect(`/campgrounds/${id}`);
		}
	} catch (err) {
		if (!err.message) {
			err.message = "Editing the campground has failed... please check your input or try again later";
			err.status = 401;
			err.refer = `/campgrounds/${id}`;
		} else {
			err.status = 500;
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

module.exports.router = router;
