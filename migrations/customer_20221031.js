'use strict'

module.exports = {
    up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Users', [{
        firstName: 'John',
        lastName: 'Doe',
        email: 'example@example.com',
        createdAt: new Date(),
        updatedAt: new Date()