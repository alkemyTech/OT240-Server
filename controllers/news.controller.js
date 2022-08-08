const {
  postNewService,
  editNews,
  retrieveNews,
  retrieveNewById,
  destroyNew,
} = require('../services/news.service');
const { validationResult } = require('express-validator');
const fs = require('fs');

const getNewById = async (req, res) => {
  try {
    const foundNew = await retrieveNewById(req.params.id);
    return res.json(foundNew);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const getNews = async (req, res) => {
  try {
    const news = await retrieveNews();
    return res.json(news);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const postNew = async (req, res) => {
  if (!req.file) {
    return res.sendStatus(400);
  }

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    fs.unlinkSync(req.file.path);
    return res.status(400).json({ errors: errors.array() });
  }

  fs.renameSync(`public/img/news/${req.file.filename}`, `public/img/news/${req.file.filename}.png`);

  req.body.categoryId = 1;
  req.body.type = 'news';
  req.body.image = `${req.file.filename}.png`;

  try {
    const result = await postNewService(req.body);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const putNews = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const storedNew = await retrieveNewById(req.params.id);
    if (!storedNew) {
      return res.status(404).json({ errors: `New not found` });
    }

    const updatedNew = {
      ...storedNew.dataValues,
      ...req.body,
    };

    const imageWasUpdated = req?.file;

    if (imageWasUpdated) {
      const newImageName = `${req.file.filename}.png`;
      fs.renameSync(`public/img/news/${req.file.filename}`, `public/img/news/${newImageName}`);
      fs.unlinkSync(`public/img/news/${storedNew.image}`);
      updatedNew.image = newImageName;
    }

    await editNews(updatedNew);
    res.status(200).json({ msg: `News updated`, new: updatedNew });
  } catch (error) {
    res.status(500).json({ errors: error.message });
  }
};

const deleteNew = async (req, res) => {
  if (!req?.params?.id) {
    return res.status(404).json({ error: 'Id is required through params to delete entry' });
  }

  try {
    const deleted = await destroyNew(req.params.id);
    return res.json({ deleted });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports = { postNew, putNews, getNews, getNewById, deleteNew };
