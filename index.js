const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/yelp-camp");

const ejsMate = require("ejs-mate");

const ExpressError = require("./helpers/expressError");

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

// this catches all the errors and thanks to our custom errors handling class, we send responses accordingly
app.use("/", (err, req, res, next) => {
	const { message = "Something Went Wrong...", status = 500 } = err;
	res.status(status).send(message);
});

// // error handler has to be at the end

// app.use("/", (err, req, res, next) => {
// 	console.log("=================ERROR=================");
// 	console.log(err.message);
// 	next(err);
// 	- next(err); express handles it <=
// 	- (if no error middleware after this one, express prints the error and the stack trace to the page, if there are any errors;		middlewares after this one, the control get passed to them, if they dont call next, we are left hanging, if they call next, 	its the same here)
// 	- next(); next middlewares or to custom error handlers <=
// 	- (if we dont have custom error handlers, express prints "can't get /PATH")
// 	- only one error handler runs, the first from top to bottom
// });

// app.use("/", (err, req, res, next) => {
// 	console.log("Second");
// 	next();
// 	- next(err);
// });

app.listen(5000, () => {
	console.log("running at port 5000");
});
