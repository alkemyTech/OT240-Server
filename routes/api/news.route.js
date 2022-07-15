const express = require('express');
const router = express.Router();

const newsController = require('../../controllers/news.controller');

router.route('/').post(newsController.postNew);

module.exports = router;
