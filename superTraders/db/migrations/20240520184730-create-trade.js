'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Trades', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      UserID: {
        type: Sequelize.INTEGER
      },
      ShareId: {
        type: Sequelize.INTEGER
      },
      Lots: {
        type: Sequelize.INTEGER
      },
      BuyOrSell: {
        type: Sequelize.BOOLEAN
      },
      BeforePrice: {
        type: Sequelize.DECIMAL
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
    await queryInterface.dropTable('Trades');
  }
};