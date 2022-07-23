const { addCategory } = require('../services/categories.service');

const postCategory = async (req, res) => {
  if (!req?.body) {
    return res.status(404).json({ error: 'request body missing' });
  }

  if (!req.body?.name) {
    return res.status(404).json({ error: '"name" filed is required' });
  }

  if (typeof req.body.name !== 'string') {
    return res.status(404).json({ error: '"name" filed must be of type: "string"' });
  }

  const date = new Date();
  const newCategory = {
    ...req.body,
    createdAt: date,
    updatedAt: date,
  };

  try {
    const postedCategory = await addCategory(newCategory);
    return res.json(postedCategory);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports = { postCategory };
