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
    validate: {
      notNull: {
        msg: 'ShortShareName cannot be null',
      },
      notEmpty: {
        msg: 'ShortShareName cannot be empty',
      },
    }
  },
  Price: {
    type: DataTypes.DECIMAL(10, 2), 
    allowNull: false,
    defaultValue: 0.00,
    validate: {
      notNull: {
        msg: 'Price cannot be null',
      },
      notEmpty: {
        msg: 'Price cannot be empty',
      },
    }
  },
  BeforePrice: {
    type: DataTypes.DECIMAL(10, 2), 
    allowNull: false,
    defaultValue: 0.00,
    validate: {
      notNull: {
        msg: 'Before Price cannot be null',
      },
      notEmpty: {
        msg: 'Before Price cannot be empty',
      },
    }
  },
  Lot: {
    type: DataTypes.INTEGER,
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
  modelName: 'Share ',
});

module.exports = Share;
