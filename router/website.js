const express = require("express");
const router = express.Router();

const { getAll, getById, createNewCamp, updateCamp, deleteCamp } = require("../controllers/app");

router.get("/", async (req, res) => {
	const campgrounds = await getAll();
	res.render("campgrounds/index", { campgrounds });
});

router.post("/", async (req, res) => {
	console.log("fired");
	const camp = req.body.campground;
	console.log(camp);
	const isCampgroundSaved = await createNewCamp({ ...camp });
	if (isCampgroundSaved) res.redirect(`/campgrounds/${isCampgroundSaved._id}`);
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

router.delete("/:id/delete", async (req, res) => {
	console.log("delete route");
	const { id } = req.params;
	const campground = await deleteCamp(id);
	if (campground) res.redirect("/campgrounds");
	else res.send("404");
});

router.patch("/:id/edit", async (req, res) => {
	const camp = req.body.campground;
	console.log("patch");
	const { id } = req.params;
	const isCampUpdated = await updateCamp(camp, id);
	if (isCampUpdated) res.redirect(`/campgrounds/${id}`);
	else res.redirect(`/campgrounds/${id}`);
});

module.exports.router = router;
