const express = require("express");
const router = express.Router();

const { getAll } = require("../controllers/app");

router.get("/", async (req, res) => {
	const campgrounds = await getAll();
	res.json(campgrounds);
});

module.exports.router = router;
