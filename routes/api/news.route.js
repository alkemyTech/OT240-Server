const express = require('express');
const router = express.Router();
const { check } = require('express-validator');

const newsController = require('../../controllers/news.controller');
const validateToken = require('../../middleware/validateToken');
const verifyRoles = require('../../middleware/verifyRoles');
const ROLES_LIST = require('../../config/rolesList');

//@route    GET /api/news/:id
//@desc     Retrieve entry of type: "news" by id
//@access   Public
router.get('/:id', newsController.getNewById);

//@route    GET /api/news
//@desc     Retrieve all entries of type: "news"
//@access   Public
router.get('/', newsController.getNews);

//@route    POST /api/news
//@desc     Post entry of type: "news"
//@access   Private (Admin)
router.post('/', validateToken, verifyRoles(ROLES_LIST.Admin), newsController.postNew);

//@route    PUT /api/news
//@desc     Actualizar una novedad existente
//@access   Private (Admin)
router.put(
  '/:id',
  [check('name', 'name must be string').isString()],
  [check('content', 'content must be string').isString()],
  [check('image', 'image must be string').isString()],
  [check('categoryId', 'categoryId must be integer').isInt()],
  [check('type', 'type must be string').isString()],
  validateToken,
  verifyRoles(ROLES_LIST.Admin),
  newsController.putNews
);

//@route    DELETE /api/news/:id
//@desc     Post entry of type: "news"
//@access   Private (Admin)
router.delete('/:id', validateToken, verifyRoles(ROLES_LIST.Admin), newsController.deleteNew);

module.exports = router;
