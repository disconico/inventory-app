const Material = require('../models/material');
const { body, validationResult } = require('express-validator');

// Display list of all materials
exports.material_list = function (req, res, next) {
	Material.find()
		.sort([['quantity', 'descending']])
		.populate('category')
		.populate('owner')
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
	body('description').trim().isLength({ min: 1 }).escape(),
	body('quantity')
		.escape()
		.isInt({ min: 0 })
		.withMessage('Must be greater or equal to 0'),
	body('price')
		.escape()
		.isInt({ min: 1 })
		.withMessage('Must be greater or equal to 1'),
	body('owner')
		.trim()
		.isLength({ min: 1 })
		.escape()
		.withMessage('Owner must be specified'),
	body('category')
		.trim()
		.isLength({ min: 1 })
		.escape()
		.withMessage('Category must be specified'),
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
			description: req.body.description,
			price: req.body.price,
			quantity: req.body.quantity,
			category: req.body.category,
			owner: req.body.owner,
		})
			.then((items) => res.json(items))
			.catch((err) => console.log(err));
	},
];

// Display detail page for a specific material
exports.material_detail = (req, res, next) => {
	Material.findById(req.params.id)
		.populate('owner')
		.populate('category')
		.then((items) => res.json(items))
		.catch((err) => console.log(err));
};

// Handle material delete on POST.
exports.material_delete_post = (req, res, next) => {
	Material.findByIdAndDelete({ _id: req.params.id })
		.then((items) => res.json(items))
		.catch((err) => console.log(err));
};

// Handle material update on PUT
exports.material_update_put = [
	// Validate and sanitize fields
	body('product')
		.trim()
		.isLength({ min: 1 })
		.escape()
		.withMessage('Product name must be specified.')
		.isAlphanumeric()
		.withMessage('Product name has non-alphanumeric characters.'),
	body('description').trim().isLength({ min: 1 }).escape(),
	body('quantity')
		.escape()
		.isInt({ min: 0 })
		.withMessage('Must be greater or equal to 0'),
	body('price')
		.escape()
		.isInt({ min: 1 })
		.withMessage('Must be greater or equal to 1'),
	body('owner')
		.trim()
		.isLength({ min: 1 })
		.escape()
		.withMessage('Owner must be specified'),
	body('category')
		.trim()
		.isLength({ min: 1 })
		.escape()
		.withMessage('Category must be specified'),
	// Process request after validation and sanitization.
	(req, res, next) => {
		// Extract the validation errors from a request.
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		// Data from form is valid.

		// Update a Material object
		console.log(req.body);
		Material.updateOne(
			{ _id: req.params.id },
			{
				product: req.body.product,
				description: req.body.description,
				price: req.body.price,
				quantity: req.body.quantity,
				category: req.body.category,
				owner: req.body.owner,
			},
		)
			.then((items) => res.json(items))
			.catch((err) => console.log(err));
	},
];
