'use strict';
const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../../config/database');
const AppError = require('../../utils/appError');

class User extends Model {
    static associate(models) {
        User.hasMany(models.Portfolio, { foreignKey: 'UserID' });
        User.hasMany(models.Trade, { foreignKey: 'UserID' });
        User.hasMany(models.UserLot, { foreignKey: 'UserID' });
    }
    
    async setPassword(password, confirmPassword) {
        if (password.length < 7) {
            throw new AppError('Password length must be greater than 7', 400);
        }
        if (password !== confirmPassword) {
            throw new AppError('Password and confirm password must be the same', 400);
        }
        this.password = await bcrypt.hash(password, 10);
    }
}

User.init({
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    firstname: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'firstname cannot be null',
            },
            notEmpty: {
                msg: 'firstname cannot be empty',
            },
        },
    },
    lastname: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'lastname cannot be null',
            },
            notEmpty: {
                msg: 'lastname cannot be empty',
            },
        },
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'email cannot be null',
            },
            notEmpty: {
                msg: 'email cannot be empty',
            },
            isEmail: {
                msg: 'Invalid email id',
            },
        },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'password cannot be null',
            },
            notEmpty: {
                msg: 'password cannot be empty',
            },
        },
    },
    createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
    },
    updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
    },
    deletedAt: {
        type: DataTypes.DATE,
    },
}, {
    sequelize,
    paranoid: true,
    freezeTableName: true,
    modelName: 'user',
});

module.exports = User;
