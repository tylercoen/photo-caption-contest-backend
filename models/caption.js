"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Caption extends Model {
    static associate(models) {
      Caption.belongsTo(models.Photo, { foreignKey: "photoId", as: "photo" });
    }
  }
  Caption.init(
    {
      photoId: DataTypes.INTEGER,
      text: DataTypes.STRING,
      author: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Caption",
    }
  );
  return Caption;
};
