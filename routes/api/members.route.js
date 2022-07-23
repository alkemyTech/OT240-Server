const express = require('express');
const router = express.Router();
const { check } = require('express-validator');

const {
  postMembers,
  putMember,
  getMembers,
  deleteMember,
} = require('../../controllers/members.controller.js');

const verifyRoles = require('../../middleware/verifyRoles');
const ROLES_LIST = require('../../config/rolesList');

//@route    POST /api/members
//@desc     Crea miembro, Valida que se envíe el campo name, y el mismo sea un string
//@access   Private
router.post(
  '/',
  //   verifyRoles(ROLES_LIST.Admin),
  [
    check('name', 'Name is Required').not().isEmpty(),
    check('name', 'Name must be string').isString(),
  ],
  postMembers
);

//@route    GET /api/members
//@desc     Devuelve todos los Miembros
//@access   Private
router.get(
  '/',
  // verifyRoles(ROLES_LIST.Admin),
  getMembers
);

//@route    PUT /api/members
//@desc     Actualiza miembro, valida que el miembro existe y lo actualiza
//@access   Private
router.put(
  '/:id',
  //   verifyRoles(ROLES_LIST.Admin),
  [
    check('name', 'Name is Required').not().isEmpty(),
    check('name', 'Name must be string').isString(),
  ],
  putMember
);

//@route    DELETE /api/members
//@desc     Valida que un miembro existe por su id y lo elimina, caso contrario devolver un error
//@access   Private
router.delete('/:id', verifyRoles(ROLES_LIST.Admin), deleteMember);

module.exports = router;
