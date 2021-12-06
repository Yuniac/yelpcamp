const isFormValid = (rules) => {
	// const imgRegex = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
	const numbersRegex = /^[1-9]+$/;
	const { title, location, img, description, price } = rules;
	if (title.length && location.length && img.length && description.length && numbersRegex.test(parseInt(price))) {
		return true;
	}
	return false;
};

const validateForms = function () {
	"use strict";
	// Fetch all the forms we want to apply custom Bootstrap validation styles to
	const forms = document.querySelectorAll(".needs-validation");

	if (forms) {
		// Loop over them and prevent submission
		Array.from(forms).forEach(function (form) {
			const campTitle = document.querySelector("input[name='campground[title]']");
			const campLocation = document.querySelector("input[name='campground[location]']");
			const campImg = document.querySelector("input[name='campground[image]']");
			const campDescription = document.querySelector("textarea[name='campground[description]']");
			const campPrice = document.querySelector("input[name='campground[price]']");

			form.addEventListener(
				"submit",
				function (event) {
					const rules = {
						title: campTitle.value,
						location: campLocation.value,
						img: campImg.value,
						description: campDescription.value,
						price: campPrice.value,
					};
					if (!isFormValid(rules)) {
						event.preventDefault();
						event.stopPropagation();
					}
					form.classList.add("was-validated");
				},
				false
			);
		});
	}
};
validateForms();

const validateReviewForm = function () {
	"use strict";
	const form = document.querySelector(".review-form-validation");
	if (form) {
		form.addEventListener(
			"submit",
			function (event) {
				if (!form.checkValidity()) {
					event.preventDefault();
					event.stopPropagation();
				}
				form.classList.add("was-validated");
			},
			false
		);
	}
};
validateReviewForm();
