const express = require("express");
const router = express.Router();

const { getAll, getById, createNewCamp, updateCamp, deleteCamp } = require("../controllers/app");

router.get("/", async (req, res, next) => {
	try {
		const campgrounds = await getAll();
		res.render("campgrounds/index", { campgrounds });
	} catch (err) {
		next(err);
	}
});

router.post("/", async (req, res, next) => {
	try {
		const camp = req.body.campground;
		const isCampgroundSaved = await createNewCamp({ ...camp });
		if (isCampgroundSaved) res.redirect(`/campgrounds/${isCampgroundSaved._id}`);
	} catch (err) {
		err.message = "Creating a new campground has failed... please check your input";
		next(err);
	}
});

router.get("/new", async (req, res) => {
	res.render("campgrounds/new");
});

router.get("/:id", async (req, res, next) => {
	try {
		const { id } = req.params;
		const campground = await getById(id);
		res.render("campgrounds/show", { campground });
	} catch (err) {
		err.message = "No campground exist with that ID.";
		err.status = 404;
		next(err);
	}
});

router.get("/:id/edit", async (req, res, next) => {
	try {
		const { id } = req.params;
		const campground = await getById(id);
		if (campground) res.render("campgrounds/edit", { campground });

		// old:
		// else next(new ExpressError("Prodcut not found", "404"));
		// up here we can see how throw ExpressError would work in an async function, just need to pass it in next() instead of throwing it on its own, this way, it will be caught by our app.use(err, req, res, next) error handler
	} catch (err) {
		next(err);
	}
});

router.delete("/:id/delete", async (req, res, next) => {
	try {
		const { id } = req.params;
		const campground = await deleteCamp(id);
		if (campground) res.redirect("/campgrounds");
	} catch (err) {
		err.message = "Deleting the campground has failed... please check you have the right permissions or try again later.";
		err.status = 401;
		next(err);
	}
});

router.patch("/:id/edit", async (req, res, next) => {
	try {
		const camp = req.body.campground;
		const { id } = req.params;
		const isCampUpdated = await updateCamp(camp, id);
		if (isCampUpdated) res.redirect(`/campgrounds/${id}`);
		else res.redirect(`/campgrounds/${id}`);
	} catch (err) {
		err.message = "Editing the campground has failed... please check your input or try again later";
		err.status = 400;
		next(err);
	}
});

module.exports.router = router;
