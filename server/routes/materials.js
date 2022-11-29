const express = require('express');
const router = express.Router();

// Require controller modules.
const material_controller = require('../controllers/materialController');

router.get('/', material_controller.material_list);

module.exports = router;
