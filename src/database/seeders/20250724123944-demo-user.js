'use strict';

const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');

module.exports = {
  async up(queryInterface, Sequelize) {
    const passwordHash = await bcrypt.hash('Password123', 10);
    
    return queryInterface.bulkInsert('Users', [
      {
        id: uuidv4(),
        name: 'Adeline Demo',
        email: 'adeline@example.com',
        password: passwordHash,
        provider: 'local',
        role: 'user',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        name: 'Google User',
        email: 'googleuser@example.com',
        provider: 'google',
        password: null,
        role: 'user',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', {
      email: ['adeline@example.com', 'googleuser@example.com']
    });
  }
};
