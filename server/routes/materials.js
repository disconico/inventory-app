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

// POST request to delete material
router.delete('/:id/delete', material_controller.material_delete_post);

// PUT request to update material
router.put('/:id/update', material_controller.material_update_put);

module.exports = router;
