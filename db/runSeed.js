const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/yelp-camp");

const { Campground } = require("../model/schema");
const { seed, descriptors, places } = require("../db/seed");

const seedDB = async () => {
	await Campground.deleteMany({});
	const makeTitle = (places, descriptors) => {
		const first = Math.floor(Math.random() * places.length);
		const second = Math.floor(Math.random() * descriptors.length);
		return places[first] + " " + descriptors[second];
	};
	const makePrice = () => {
		const min = 10;
		const max = 100;
		const price = Math.floor(Math.random() * (max - min + 1) + min);
		return price;
	};
	for (let i = 0; i < 50; i++) {
		const randmoNumber = Math.floor(Math.random() * seed.length);
		const camp = new Campground({
			title: makeTitle(places, descriptors),
			price: makePrice(),
			description:
				"Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi, cupiditate adipisci. Excepturi quaerat repellendus asperiores eius odit est quam exercitationem ut, animi optio quia! Est soluta qui commodi ullam eligendi.",
			location: `${seed[randmoNumber].state}, ${seed[randmoNumber].city}`,
			image: "https://source.unsplash.com/collection/483251",
		});
		await camp.save();
	}
};

const main = async () => {
	await seedDB();
	mongoose.connection.close();
	console.log("Connection closed");
};

main();
