const postNewService = async (postBody) => {
  return postBody;
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

module.exports = { postNewService, editNews, newsExists };
