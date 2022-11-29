const User = require('../models/user');
const Material = require('../models/material');
const async = require('async');
const { body, validationResult } = require('express-validator');

//Index for Home page
exports.index = function (req, res, next) {
	async.parallel(
		{
			user_count(callback) {
				User.countDocuments({}, callback); // Pass an empty object as match condition to find all documents of this collection
			},
			material_count(callback) {
				Material.countDocuments({ quantity: { $gt: 0 } }, callback);
			},
		},
		(err, results) => {
			if (err) {
				console.log(err);
			}
			res.json(results);
		},
	);
};

//Display list of all Users
exports.user_list = function (req, res, next) {
	User.find()
		.sort([['family_name', 'ascending']])
		.then((items) => res.json(items))
		.catch((err) => console.log(err));
};

// //Eraser
// exports.user_list = function (req, res, next) {
// 	User.deleteMany({ first_name: { $in: ['hello', 'miaou', '  miaou '] } })
// 		.sort([['family_name', 'ascending']])
// 		.then((items) => res.json(items))
// 		.catch((err) => console.log(err));
// };

// Handle User create on POST.
exports.user_create_post = [
	// Validate and sanitize fields.
	body('first_name')
		.trim()
		.isLength({ min: 1 })
		.escape()
		.withMessage('First name must be specified.')
		.isAlphanumeric()
		.withMessage('First name has non-alphanumeric characters.'),
	body('family_name')
		.trim()
		.isLength({ min: 1 })
		.escape()
		.withMessage('Family name must be specified.')
		.isAlphanumeric()
		.withMessage('Family name has non-alphanumeric characters.'),
	body('date_of_birth', 'Invalid date of birth')
		.optional({ checkFalsy: true })
		.isISO8601()
		.toDate(),
	// Process request after validation and sanitization.
	(req, res, next) => {
		// Extract the validation errors from a request.
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		// Data from form is valid.

		// Create an User object with escaped and trimmed data.
		User.create({
			first_name: req.body.first_name,
			family_name: req.body.family_name,
		})
			.then((items) => res.json(items))
			.catch((err) => console.log(err));
	},
];

// Display detail page for a specific user
exports.user_detail = (req, res, next) => {
	User.findById(req.params.id)
		.then((items) => res.json(items))
		.catch((err) => console.log(err));
};
