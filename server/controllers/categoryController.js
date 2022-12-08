const Category = require('../models/category');
const Material = require('../models/material');
const async = require('async');
const { body, validationResult } = require('express-validator');

// Display list of all categories
exports.category_list = function (req, res, next) {
	Category.find()
		.sort([['name', 'ascending']])
		.then((items) => res.json(items))
		.catch((err) => console.log(err));
};

// Handle Category create on POST
exports.category_create = [
	// Validate and sanitize fields
	body('name')
		.trim()
		.isLength({ min: 1 })
		.escape()
		.withMessage('Category name must be specified.')
		.isAlphanumeric()
		.withMessage('Category name has non-alphanumeric characters.'),
	body('description').trim().escape(),
	// Process request after validation and sanitization.
	(req, res, next) => {
		// Extract the validation errors from a request.
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		// Data from form is valid.

		// Create a Category object
		console.log(req.body);
		Category.create({
			name: req.body.name,
			description: req.body.description,
		})
			.then((items) => res.json(items))
			.catch((err) => console.log(err));
	},
];

// Display detail page for a specific category
exports.category_detail = (req, res, next) => {
	async.parallel(
		{
			category_find(callback) {
				Category.findById(req.params.id).exec(callback);
			},
			materials_find(callback) {
				Material.find({ category: req.params.id }).exec(callback);
			},
		},
		(err, results) => {
			if (err) {
				console.log(err);
				return res.status(400);
			}
			res.json(results);
		},
	);
};

// Handle category  delete on POST.
exports.category_delete_post = (req, res, next) => {
	Category.findByIdAndDelete({ _id: req.params.id })
		.then((items) => res.json(items))
		.catch((err) => console.log(err));
};

// Handle Category update on PUT
exports.category_update_put = [
	// Validate and sanitize fields
	body('name')
		.trim()
		.isLength({ min: 1 })
		.escape()
		.withMessage('Category name must be specified.')
		.isAlphanumeric()
		.withMessage('Category name has non-alphanumeric characters.'),
	body('description').trim().escape(),
	// Process request after validation and sanitization.
	(req, res, next) => {
		// Extract the validation errors from a request.
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		// Data from form is valid.

		// Update a Category object
		console.log(req.body);
		Category.updateOne(
			{ _id: req.params.id },
			{
				name: req.body.name,
				description: req.body.description,
			},
		)
			.then((items) => res.json(items))
			.catch((err) => console.log(err));
	},
];
