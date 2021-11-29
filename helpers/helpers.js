const isFormValid = (rules) => {
	const regex = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
	const { name, location, img, description, price } = rules;
	if (
		name.length &&
		location.length &&
		price &&
		typeof price === Number &&
		price > 0 &&
		img.length &&
		regex.test(img) &&
		description.length
	) {
		return true;
	}
	return false;
};

module.exports.isFormValid = isFormValid;
