'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Produit extends Model {
    static associate(models) {
    }
  }
  Produit.init({
    titre: DataTypes.STRING,
    description: DataTypes.STRING,
    prix: DataTypes.DECIMAL,
    image_url: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Produit',
  });
  return Produit;
};