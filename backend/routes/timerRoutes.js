const express = require('express');
const { startTimer, completeTimer, getStatus } = require('../controllers/timerController');

const router = express.Router();

router.post('/start', startTimer);
router.post('/complete', completeTimer);
router.get('/status', getStatus);

module.exports = router;
