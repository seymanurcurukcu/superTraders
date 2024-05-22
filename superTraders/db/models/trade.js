


'use strict';
const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../../config/database');
const AppError = require('../../utils/appError');

class Trade extends Model {
  static associate(models) {
    Trade.belongsTo(models.User, { foreignKey: 'UserID' });
  }
}

Trade.init({
  id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
  UserID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'UserID cannot be null',
      },
      notEmpty: {
        msg: 'UserID cannot be empty',
      },
    },
  },
  ShareId:{
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'ShareId cannot be null',
      },
      notEmpty: {
        msg: 'ShareId cannot be empty',
      },
    },
  },
  Lots:{
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Lots cannot be null',
      },
      notEmpty: {
        msg: 'Lots cannot be empty',
      },
    },
  },
  BuyOrSell:{
    type: DataTypes.BOOLEAN,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Buy Or Sell cannot be null',
      },
      notEmpty: {
        msg: 'Buy Or Sell cannot be empty',
      },
    },
  },
  BeforePrice:{
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Before Price cannot be null',
      },
      notEmpty: {
        msg: 'Before Price cannot be empty',
      },
    },
  },

  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  updatedAt: {
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  deletedAt: {
    type: DataTypes.DATE,
  },
}, {
  sequelize,
  paranoid: true,
  freezeTableName: true,
  modelName: 'Trade',
});

module.exports = Trade;
