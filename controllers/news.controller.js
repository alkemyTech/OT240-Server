const {
  postNewService,
  editNews,
  newsExists,
  retrieveNews,
  destroyNew,
} = require('../services/news.service');
const { validationResult } = require('express-validator');

const getNews = async (req, res) => {
  try {
    const news = await retrieveNews('news');
    return res.json(news);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const postNew = async (req, res) => {
  if (!req?.body) {
    return res.status(404).json({ errors: 'request body missing' });
  }
  const body = {
    ...req.body,
    type: 'news',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  try {
    const result = await postNewService(body);
    return res.json(result);
  } catch (err) {
    return res.status(500).json({ errors: err.message });
  }
};

const deleteNew = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await destroyNew(id);
    return deleted ? res.json(deleted) : res.sendStatus(204);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const putNews = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, content, image, categoryId, type, deleteAt } = req.body;
  const { id } = req.params;

  try {
    const news = await newsExists({ id });
    if (!news) {
      return res.status(404).json({ errors: `New not found` });
    }
    const updatedNew = await editNews({
      id,
      name,
      content,
      image,
      categoryId,
      type,
      updatedAt: new Date(),
      deleteAt,
    });
    res.status(200).json({ msg: `News updated`, new: updatedNew });
  } catch (error) {
    res.status(500).json({ errors: error.message });
  }
};

module.exports = { postNew, putNews, getNews, deleteNew };
