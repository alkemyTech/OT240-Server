const db = require('../models/index');

const retrieveNews = async () => {
  const news = await db.Entry.findAll({
    attributes: ['name', 'image', 'createdAt'],
    where: { type: 'news' },
  });
  return news;
};

const postNewService = async (newBody) => {
  const postedNew = await db.Entry.create(newBody);
  return postedNew;
};

const destroyNew = async (id) => {
  const savedInDb = await db.Entry.findOne({ where: { id, type: 'news' } });
  await db.Entry.destroy({ where: { id } });
  return savedInDb;
};

const editNews = async ({ id, content, image, categoryId, type, updatedAt, deleteAt }) => {
  const news = await db.Entry.update(
    { content, image, categoryId, type, updatedAt, deleteAt },
    { where: { id } }
  );
  return news;
};

const newsExists = async ({ id }) => {
  const newsExists = await db.Entry.findByPk(id);
  return newsExists ? newsExists : null;
};

module.exports = { postNewService, editNews, newsExists, retrieveNews, destroyNew };
