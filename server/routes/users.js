const express = require('express');
const router = express.Router();

// Require controller modules.
const user_controller = require('../controllers/userController');

// GET request for User list
router.get('/', user_controller.user_list);

// POST new user
router.post('/', user_controller.user_create);

// GET request for one User
router.get('/:id', user_controller.user_detail);

// POST request to delete User
router.delete('/:id/delete', user_controller.user_delete_post);

// PUT request to update User
router.put('/:id/update', user_controller.user_update_put);

module.exports = router;
