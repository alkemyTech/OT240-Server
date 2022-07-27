const express = require('express');
const router = express.Router();

const validateToken = require('../../middleware/validateToken');
const verifyRoles = require('../../middleware/verifyRoles');
const ROLES_LIST = require('../../config/rolesList');

router.use('/auth', require('./auth.route'));
router.use('/news', require('./news.route'));
router.use('/members', require('./members.route'));
router.use('/contacts', require('./contacts.route'));

module.exports = router;
