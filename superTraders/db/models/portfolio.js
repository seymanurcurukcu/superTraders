'use strict';
const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../../config/database');
const AppError = require('../../utils/appError');

class Portfolio extends Model {
  static associate(models) {
    Portfolio.belongsTo(models.User, { foreignKey: 'UserID' });
  }
}

Portfolio.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
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
  TotalBalance: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0.00,
    validate: {
      notNull: {
        msg: 'TotalBalance cannot be null',
      },
      notEmpty: {
        msg: 'TotalBalance cannot be empty',
      },
    },
  },
  TotalShareBalance: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0.00,
    validate: {
      notNull: {
        msg: 'TotalShareBalance cannot be null',
      },
      notEmpty: {
        msg: 'TotalShareBalance cannot be empty',
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
  modelName: 'Portfolio',
});

module.exports = Portfolio;
