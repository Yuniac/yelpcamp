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
	for (let i = 0; i < 50; i++) {
		const randmoNumber = Math.floor(Math.random() * seed.length);
		const camp = new Campground({
			title: makeTitle(places, descriptors),
			price: 25,
			description: `Population: ${seed[randmoNumber].population}`,
			location: `${seed[randmoNumber].state}, ${seed[randmoNumber].city}`,
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
