'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Avis extends Model {
    static associate(models) {
    }
  }
  Avis.init({
    note: DataTypes.INTEGER,
    commentaire: DataTypes.TEXT,
    date_avis: DataTypes.DATE,
    id_user: DataTypes.INTEGER,
    id_produit: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Avis',
  });
  return Avis;
};