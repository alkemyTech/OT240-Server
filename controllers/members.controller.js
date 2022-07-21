const {
  addMember,
  editMember,
  memberExists,
  destroyMember,
} = require('../services/members.service.js');
const { validationResult } = require('express-validator');

const postMembers = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, image } = req.body;

  try {
    const newMember = await addMember({
      name,
      image,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    res.status(200).json({ msg: `Member created`, member: newMember });
  } catch (error) {
    res.status(500).json({ errors: error.message });
  }
};

const putMember = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { name, image } = req.body;
  const { id } = req.params;

  try {
    const member = await memberExists({ id });
    if (!member) {
      return res.status(404).json({ errors: `Member not found` });
    }
    const updatedMember = await editMember({ id, name, image, updatedAt: new Date() });
    res
      .status(200)
      .json({ msg: `Member edited`, member: { id, name, image, updatedAt: new Date() } });
  } catch (error) {
    res.status(500).json({ errors: error.message });
  }
};

const deleteMember = async (req, res) => {
  const { id } = req.params;

  try {
    const member = await memberExists({ id });

    if (!member) {
      return res.status(404).json({ errors: `Member not found` });
    }
    await destroyMember({ id });
    res.status(200).json({ msg: `Member deleted` });
  } catch (error) {
    res.status(500).json({ errors: error.message });
  }
};

module.exports = { postMembers, putMember, deleteMember };
