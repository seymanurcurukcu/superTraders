'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Shares', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ShareName: {
        type: Sequelize.STRING
      },
      ShortShareName: {
        type: Sequelize.STRING
      },
      Price: {
        type: Sequelize.DECIMAL
      },
      BeforePrice: {
        type: Sequelize.DECIMAL
      },
      Lot: {
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('Shares');
  }
};