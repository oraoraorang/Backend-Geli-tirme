const express = require('express');
const controller = require('../controllers/reportController');

const router = express.Router();

router.get('/completed', controller.getCompleted);
router.get('/pending', controller.getPending);
router.get('/summary', controller.getSummary);

module.exports = router;
