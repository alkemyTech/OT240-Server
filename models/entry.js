'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Entry extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Entry.belongsTo(models.Category, { as: 'Category' });
    }
  }
  Entry.init(
    {
      name: DataTypes.STRING,
      content: DataTypes.TEXT('long'),
      image: DataTypes.TEXT('long'),
      categoryId: DataTypes.INTEGER,
      type: DataTypes.STRING,
      deletedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'Entry',
    }
  );
  return Entry;
};
