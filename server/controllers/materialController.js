const Material = require('../models/material');
const { body, validationResult } = require('express-validator');

//Display list of all materials
exports.material_list = function (req, res, next) {
	Material.find()
		.sort([['quantity', 'descending']])
		.then((items) => res.json(items))
		.catch((err) => console.log(err));
};

// Display detail page for a specific material
exports.material_detail = (req, res, next) => {
	Material.findById(req.params.id)
		.then((items) => res.json(items))
		.catch((err) => console.log(err));
};
