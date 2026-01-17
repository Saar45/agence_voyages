'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('activites', {
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
      description: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      dureeHeures: {
        type: Sequelize.DECIMAL(4, 1),
        allowNull: true
      },
      prix: {
        type: Sequelize.DECIMAL(8, 2),
        allowNull: true
      },
      type: {
        type: Sequelize.ENUM('Visite', 'Sport', 'Gastronomie', 'Shopping', 'Spectacle'),
        allowNull: false
      },
      niveauPhysique: {
        type: Sequelize.ENUM('Faible', 'Modéré', 'Élevé'),
        allowNull: true
      },
      ageMinimum: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      destinationId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'destinations',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
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
    await queryInterface.addIndex('activites', ['destinationId']);
    await queryInterface.addIndex('activites', ['type']);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('activites');
  }
};
