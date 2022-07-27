const db = require('../models/index.js');

const retrieveAllContacts = async () => {
  const contacts = await db.Contact.findAll({ where: { deletedAt: null } });
  return contacts;
};

module.exports = {
  retrieveAllContacts,
};
