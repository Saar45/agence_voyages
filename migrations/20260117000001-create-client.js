'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('clients', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nom: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      prenom: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      email: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true
      },
      telephone: {
        type: Sequelize.STRING(20),
        allowNull: true
      },
      dateNaissance: {
        type: Sequelize.DATEONLY,
        allowNull: true
      },
      ville: {
        type: Sequelize.STRING(50),
        allowNull: true
      },
      pays: {
        type: Sequelize.STRING(50),
        allowNull: true
      },
      preferences: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE
      }
    });
    
    // Index pour optimiser les recherches
    await queryInterface.addIndex('clients', ['email']);
    await queryInterface.addIndex('clients', ['nom', 'prenom']);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('clients');
  }
};
