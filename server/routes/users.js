const express = require('express');
const router = express.Router();

// Require controller modules.
const user_controller = require('../controllers/userController');

// GET request for User list.
router.get('/', user_controller.user_list);

// POST new user
router.post('/', user_controller.user_create_post);

// GET request for one User
router.get('/:id', user_controller.user_detail);

module.exports = router;
