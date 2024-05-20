'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Trade extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Trade.init({
    UserID: DataTypes.INTEGER,
    ShareId: DataTypes.INTEGER,
    Lots: DataTypes.INTEGER,
    BuyOrSell: DataTypes.BOOLEAN,
    BeforePrice: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'Trade',
  });
  return Trade;
};