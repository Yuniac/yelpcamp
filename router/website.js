const express = require("express");
const router = express.Router();

const { getAll, getById, createNewCamp, updateCamp, deleteCamp } = require("../controllers/app");

const ExpressError = require("../helpers/expressError");

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

router.delete("/:id/delete", async (req, res) => {
	const { id } = req.params;
	const campground = await deleteCamp(id);
	if (campground) res.redirect("/campgrounds");
	else res.send("404");
});

router.patch("/:id/edit", async (req, res) => {
	try {
		const camp = req.body.campground;
		const { id } = req.params;
		const isCampUpdated = await updateCamp(camp, id);
		if (isCampUpdated) res.redirect(`/campgrounds/${id}`);
		else res.redirect(`/campgrounds/${id}`);
	} catch (err) {
		next(err);
	}
});

module.exports.router = router;
