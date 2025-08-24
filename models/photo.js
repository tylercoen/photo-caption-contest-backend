"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Photo extends Model {
    static associate(models) {
      Photo.hasMany(models.Caption, { foreignKey: "photoId", as: "captions" });
    }
  }
  Photo.init(
    {
      title: DataTypes.STRING,
      url: DataTypes.STRING,
      description: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Photo",
    }
  );
  return Photo;
};
