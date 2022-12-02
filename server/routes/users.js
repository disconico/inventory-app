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

// GET request to delete User

// POST request to delete User
router.delete('/:id/delete', user_controller.user_delete_post);

module.exports = router;
