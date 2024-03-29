
const db = require('../models/index');
const { encryptPassword, generateToken } = require('../services/auth.service');
const { getAllUsers, getOneUserById, getUserDataFromToken } = require('../services/users.service');

const getUsers = async (req, res) => {
  try {
    const users = await getAllUsers();
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ errors: error.message });
  };
};

const userDelete = async (req, res) => {

  const user = await getOneUserById(req.params.id);
  const userDataToken = getUserDataFromToken(req.token);

  if (user !== null) {
    if( userDataToken.UserInfo.roleId == 1){

      try {
        await db.User.update(
          { deletedAt: new Date() },
          { where: {id: req.params.id,} }
        );
        res.status(200).json(user);
      } catch (error) {
        res.status(500).json(error);
      };

    }else if (userDataToken.UserInfo.id == req.params.id) {

      try {
        await db.User.update(
          { deletedAt: new Date() },
          { where: {id: req.params.id,} }
        );
        res.status(200).json(user);
      } catch (error) {
        res.status(500).json(error);
      };

    }else {
      res.status(400).json({msg: "You can't delete other users"});
    };

  } else {
    res.status(404).json({ msg: 'User not found' });
  };
};

const userUpdate = async (req, res) => {

  let user = await getOneUserById(req.params.id);
  let password;

  if ( req.body.password !== undefined) {
    password = await encryptPassword(req.body.password);
  };

  if (user !== null) {

    const anotherUser = await db.User.findOne({where: {email: req.body.email}});

    if (anotherUser == null || anotherUser.deletedAt !== null || anotherUser.id === user.id || user.roleId === 1) {


      user = { ...user,
        firstName: req.body.firstName || user.firstName,
        lastName: req.body.lastName || user.lastName,
        email: req.body.email || user.email,
        password: password || user.password,
        image: req.body.image || user.image,
        roleId: req.body.roleId || user.roleId
      };
      const newToken = generateToken(user);
      try {
        db.User.update(user,
          {where: {id: req.params.id}}
        );
        res.status(200).json({token: newToken, user});
      } catch (error) {
        res.status(500).json({msg: 'An error occurred trying to update the user', error});
      };
    } else {
      res.status(500).json({msg: 'Internal server error'});
    };

  } else {
    res.status(404).json({msg: 'User not found'});
  };


};

module.exports = { userDelete, getUsers, userUpdate };
