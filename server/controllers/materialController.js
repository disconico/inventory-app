const Material = require('../models/material');
const { body, validationResult } = require('express-validator');

// Display list of all materials
exports.material_list = function (req, res, next) {
	Material.find()
		.sort([['quantity', 'descending']])
		.then((items) => res.json(items))
		.catch((err) => console.log(err));
};

// Handle Material create on POST
exports.material_create = [
	// Validate and sanitize fields
	body('product')
		.trim()
		.isLength({ min: 1 })
		.escape()
		.withMessage('Product name must be specified.')
		.isAlphanumeric()
		.withMessage('Product name has non-alphanumeric characters.'),
	body('quantity')
		.escape()
		.isInt({ min: 0 })
		.withMessage('Must be greater or equal to 0'),
	// Process request after validation and sanitization.
	(req, res, next) => {
		// Extract the validation errors from a request.
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		// Data from form is valid.

		// Create a Material object
		console.log(req.body);
		Material.create({
			product: req.body.product,
			quantity: req.body.quantity,
		})
			.then((items) => res.json(items))
			.catch((err) => console.log(err));
	},
];

// Display detail page for a specific material
exports.material_detail = (req, res, next) => {
	Material.findById(req.params.id)
		.then((items) => res.json(items))
		.catch((err) => console.log(err));
};
