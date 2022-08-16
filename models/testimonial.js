'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Testimonial extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here;
    }
  }
  Testimonial.init(
    {
      name: DataTypes.STRING,
      content: DataTypes.TEXT('long'),
      image: DataTypes.TEXT('long'),
    },
    {
      sequelize,
      modelName: 'Testimonial',
      timestamps: false,
    }
  );
  return Testimonial;
};
