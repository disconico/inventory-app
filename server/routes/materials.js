const express = require('express');
const router = express.Router();

// Require controller modules.
const material_controller = require('../controllers/materialController');

// GET request for material list
router.get('/', material_controller.material_list);

// Post new material
router.post('/', material_controller.material_create);

// GET request for one material
router.get('/:id', material_controller.material_detail);

module.exports = router;
