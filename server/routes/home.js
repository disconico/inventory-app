const express = require('express');
const router = express.Router();

// Require controller modules.
const user_controller = require('../controllers/userController');
const material_controller = require('../controllers/materialController');

// GET home page.
router.get('/', user_controller.index);

module.exports = router;
