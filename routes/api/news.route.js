const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const verifyRoles = require('../../middleware/verifyRoles');
const ROLES_LIST = require('../../config/rolesList');

const newsController = require('../../controllers/news.controller');

//@route    GET /api/news
//@desc     Retrieve all entries of type: "news"
//@access   Private (Admin)
router.get('/', verifyRoles(ROLES_LIST.Admin), newsController.getNews);

//@route    POST /api/news
//@desc     Post new entry of type: "news"
//@access   Private (Admin)
router.post('/', verifyRoles(ROLES_LIST.Admin), newsController.postNew);

//@route    PUT /api/news
//@desc     Actualizar una novedad existente
//@access   Private
router.put(
  '/:id',
  //   verifyRoles(ROLES_LIST.Admin),
  [check('name', 'name must be string').isString()],
  [check('content', 'content must be string').isString()],
  [check('image', 'image must be string').isString()],
  [check('categoryId', 'categoryId must be integer').isInt()],
  [check('type', 'type must be string').isString()],
  newsController.putNews
);

module.exports = router;
