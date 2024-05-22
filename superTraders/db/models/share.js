'use strict';
module.exports = (sequelize, DataTypes) => {
  const Share = sequelize.define('Share', {
    ShareName: DataTypes.STRING,
    ShortShareName: DataTypes.STRING,
    Price: DataTypes.DECIMAL,
    BeforePrice: DataTypes.DECIMAL,
    Lot: DataTypes.INTEGER
  }, {});
  
  Share.associate = function(models) {
    Share.hasMany(models.Trade, { foreignKey: 'ShareId' });
    Share.hasMany(models.UserLot, { foreignKey: 'ShareId' });
  };
  
  return Share;
};


'use strict';
const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../../config/database');
const AppError = require('../../utils/appError');

class Share  extends Model {
  static associate(models) {
    Share.hasMany(models.Trade, { foreignKey: 'ShareId' });
    Share.hasMany(models.UserLot, { foreignKey: 'ShareId' });
  }
}

Share.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  ShareName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'ShareName cannot be null',
      },
      notEmpty: {
        msg: 'ShareName cannot be empty',
      },
    }
  },
 
  ShortShareName: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      len: {
        args: [3, 3],
        msg: 'ShortShareName must be exactly 3 characters long'
      },
      isUppercase: true
    }
  },
  Price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      isDecimal: {
        args: true,
        msg: 'Price must be a decimal number'
      },
      min: 0
    }
  },
  BeforePrice: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      isDecimal: {
        args: true,
        msg: 'BeforePrice must be a decimal number'
      },
      min: 0
    }
  },
  Lot: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1
    }
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
  modelName: 'Share',
});

module.exports = Share;
