'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Trade', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      UserID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'user', 
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      ShareId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Share', 
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      Lots: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      BuyOrSell: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      BeforePrice: {
        allowNull: false,
        type: Sequelize.DECIMAL(10, 2), 
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deletedAt: {
        type: Sequelize.DATE,
    }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Trade');
  }
};