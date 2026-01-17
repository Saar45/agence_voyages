'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('voyage_activites', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      voyageId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'voyages',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      activiteId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'activites',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      jour: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      ordre: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      type: {
        type: Sequelize.ENUM('Visite', 'Sport', 'Gastronomie', 'Shopping', 'Spectacle'),
        allowNull: true
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
      estInclus: {
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
    await queryInterface.addIndex('voyage_activites', ['voyageId']);
    await queryInterface.addIndex('voyage_activites', ['activiteId']);
    // Index unique pour éviter les doublons
    await queryInterface.addIndex('voyage_activites', ['voyageId', 'activiteId'], {
      unique: true,
      name: 'unique_voyage_activite'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('voyage_activites');
  }
};
