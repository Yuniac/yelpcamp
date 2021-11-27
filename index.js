const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/yelp-camp");

const ejsMate = require("ejs-mate");

const { router: website } = require("./router/website");

app.set("view engine", "ejs");
app.engine("ejs", ejsMate);
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.get("/", (req, res) => {
	res.render("home");
});
app.use("/campgrounds", website);

app.listen(5000, () => {
	console.log("running at port 5000");
});
