'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Slide extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      //Possible attempt of association to organization table
      /*slide.belongsTo(models.Organization, {
            as: "organization",
            foreignKey: 'organizationId'
        }) */
    }
  }
  Slide.init(
    {
      image: DataTypes.TEXT('long'),
      text: DataTypes.TEXT,
      order: DataTypes.INTEGER,
      organizationId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Slide',
    }
  );
  return Slide;
};
