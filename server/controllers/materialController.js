const Material = require('../models/material');
const { body, validationResult } = require('express-validator');

//Display list of all materials
exports.material_list = function (req, res, next) {
	Material.find()
		.sort([['quantity', 'descending']])
		.then((items) => res.json(items))
		.catch((err) => console.log(err));
};
