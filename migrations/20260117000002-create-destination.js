'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('destinations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nom: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      pays: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      continent: {
        type: Sequelize.ENUM('Europe', 'Asie', 'Amérique', 'Afrique', 'Océanie', 'Antarctique'),
        allowNull: false
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      climat: {
        type: Sequelize.ENUM('Tropical', 'Désertique', 'Tempéré', 'Polaire', 'Montagnard'),
        allowNull: true
      },
      meilleurePeriode: {
        type: Sequelize.STRING(50),
        allowNull: true
      },
      langues: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      monnaie: {
        type: Sequelize.STRING(20),
        allowNull: true
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
      }
    });
    
    // Index pour optimiser les recherches
    await queryInterface.addIndex('destinations', ['continent']);
    await queryInterface.addIndex('destinations', ['pays']);
    await queryInterface.addIndex('destinations', ['isActive']);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('destinations');
  }
};
