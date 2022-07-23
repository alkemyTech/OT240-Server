const express = require('express');
const router = express.Router();

const verifyRoles = require('../../middleware/verifyRoles');
const ROLES_LIST = require('../../config/rolesList');
const categoriesController = require('../../controllers/categories.controller');

router.route('/').post(verifyRoles(ROLES_LIST.Admin), categoriesController.postCategory);

module.exports = router;
