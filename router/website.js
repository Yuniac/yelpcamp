const express = require("express");
const router = express.Router();

const { getAll, getById, createNewCamp, updateCamp } = require("../controllers/app");

router.get("/", async (req, res) => {
	const campgrounds = await getAll();
	res.render("campgrounds/index", { campgrounds });
});

router.post("/", async (req, res) => {
	const { title, location } = req.body.campground;
	const isDataSaved = await createNewCamp({ title, location });
	if (isDataSaved) res.redirect(`/campgrounds/${isDataSaved._id}`);
	else res.send("404");
});

router.get("/new", async (req, res) => {
	res.render("campgrounds/new");
});

router.get("/:id", async (req, res) => {
	const { id } = req.params;
	const campground = await getById(id);
	res.render("campgrounds/show", { campground });
});

router.get("/:id/edit", async (req, res) => {
	const { id } = req.params;
	const campground = await getById(id);
	res.render("campgrounds/edit", { campground });
});

router.patch("/:id/edit", async (req, res) => {
	const { title, location } = req.body.campground;
	const { id } = req.params;
	const campground = await getById(id);
	const isSuccess = await updateCamp({ title, location }, campground);
	res.redirect(`/campgrounds/${id}`);
});

router.delete("/delete/:id", async (req, res) => {
	const { id } = req.params;
	const campground = await getById(id);
	console.log(campground);
	await campground.remove();
	res.redirect("/campgrounds");
});

module.exports.router = router;
