'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Share extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Share.init({
    ShareName: DataTypes.STRING,
    ShortShareName: DataTypes.STRING,
    Price: DataTypes.DECIMAL,
    BeforePrice: DataTypes.DECIMAL,
    Lot: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Share',
  });
  return Share;
};