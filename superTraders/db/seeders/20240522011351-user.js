'use strict';

const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const users = [
      {
        firstname: 'John',
        lastname: 'Doe',
        email: 'johndoe@gmail.com',
        password: bcrypt.hashSync('John123.', 10),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstname: 'Jane',
        lastname: 'Smith',
        email: 'janesmith@gmail.com',
        password: bcrypt.hashSync('Jane123.', 10),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstname: 'Alice',
        lastname: 'Johnson',
        email: 'alicejohnson@gmail.com',
        password: bcrypt.hashSync('Alice123.', 10),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstname: 'Bob',
        lastname: 'Brown',
        email: 'bobbrown@gmail.com',
        password: bcrypt.hashSync('Bob123.', 10),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstname: 'Charlie',
        lastname: 'Davis',
        email: 'charliedavis@gmail.com',
        password: bcrypt.hashSync('Charlie123.', 10),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    return queryInterface.bulkInsert('user', users, {});
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('user', {
      email: [
        'johndoe@gmail.com',
        'janesmith@gmail.com',
        'alicejohnson@gmail.com',
        'bobbrown@gmail.com',
        'charliedavis@gmail.com'
      ]
    }, {});
  }
};
