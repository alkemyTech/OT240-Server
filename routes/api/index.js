const express = require('express');
const router = express.Router();


router.use('/auth', require('./auth.route'));
router.use('/news', require('./news.route'));
router.use('/members', require('./members.route'));

module.exports = router;
