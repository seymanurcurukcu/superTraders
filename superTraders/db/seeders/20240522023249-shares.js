'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const shares = [
      {
        ShareName: 'Apple Inc.',
        ShortShareName: 'AAP', 
        Price: 150.00,
        BeforePrice: 145.00,
        Lot: 100,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        ShareName: 'Google LLC',
        ShortShareName: 'GOO', 
        Price: 2800.00,
        BeforePrice: 2750.00,
        Lot: 100,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        ShareName: 'Amazon Inc.',
        ShortShareName: 'AMZ', 
        Price: 3400.00,
        BeforePrice: 3350.00,
        Lot: 100,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        ShareName: 'Microsoft Corp.',
        ShortShareName: 'MSF', 
        Price: 300.00,
        BeforePrice: 290.00,
        Lot: 100,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        ShareName: 'Tesla Inc.',
        ShortShareName: 'TSL', 
        Price: 700.00,
        BeforePrice: 680.00,
        Lot: 100,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    return queryInterface.bulkInsert('Share', shares, {});
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Share', null, {});
  }
};
