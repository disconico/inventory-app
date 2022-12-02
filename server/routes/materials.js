const express = require('express');
const router = express.Router();

// Require controller modules.
const material_controller = require('../controllers/materialController');

// GET request for Material list
router.get('/', material_controller.material_list);

// GET request for one User
router.get('/:id', material_controller.material_detail);

module.exports = router;
