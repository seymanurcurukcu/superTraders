
'use strict';
const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../../config/database');
const AppError = require('../../utils/appError');

class UserLot extends Model {
  static associate(models) {
    UserLot.belongsTo(models.User, { foreignKey: 'UserID' });
    UserLot.belongsTo(models.Share, { foreignKey: 'ShareId' });
  }
}

UserLot.init({
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
  TotalNumberOfShare: {
    type: DataTypes.INTEGER,
    allowNull: false,
   
    validate: {
      notNull: {
        msg: 'Total Number Of Share cannot be null',
      },
      notEmpty: {
        msg: 'Total Number Of Share cannot be empty',
      },
    },
  },
  TotalBalanceOfShare: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0.00,
    validate: {
      notNull: {
        msg: 'Total Balance Of Share cannot be null',
      },
      notEmpty: {
        msg: 'Total Balance Of Share cannot be empty',
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
  modelName: 'UserLot ',
});

module.exports = UserLot;
