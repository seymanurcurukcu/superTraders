'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Share', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ShareName: {
        allowNull: false,
        type: Sequelize.STRING
      },
      ShortShareName: {
        allowNull: false,
        type: Sequelize.STRING
      },
      Price: {
        type: Sequelize.DECIMAL(10, 2), 
        allowNull: false,
        defaultValue: 0.00
      },
      BeforePrice: {
        type: Sequelize.DECIMAL(10, 2), 
        allowNull: false,
        defaultValue: 0.00
      },
      Lot: {
        type: Sequelize.INTEGER,
       
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      deletedAt: {
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Share');
  }
};  
