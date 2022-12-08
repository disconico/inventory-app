const express = require('express');
const router = express.Router();

// Require controller modules.
const category_controller = require('../controllers/categoryController');

// GET request for category list
router.get('/', category_controller.category_list);

// Post new category
router.post('/', category_controller.category_create);

// GET request for one category
router.get('/:id', category_controller.category_detail);

// POST request to delete category
router.delete('/:id/delete', category_controller.category_delete_post);

// PUT request to update category
router.put('/:id/update', category_controller.category_update_put);

module.exports = router;
