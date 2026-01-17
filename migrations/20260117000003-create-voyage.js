'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('voyages', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      titre: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      dateDepart: {
        type: Sequelize.DATE,
        allowNull: false
      },
      dateRetour: {
        type: Sequelize.DATE,
        allowNull: false
      },
      dureeJours: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      prixBase: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },
      placesDisponibles: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 20
      },
      niveauDifficulte: {
        type: Sequelize.ENUM('Facile', 'Modéré', 'Difficile', 'Expert'),
        allowNull: false,
        defaultValue: 'Modéré'
      },
      typeVoyage: {
        type: Sequelize.ENUM('Aventure', 'Culturel', 'Balnéaire', 'Gastronomique', 'Ecotourisme'),
        allowNull: true
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
    await queryInterface.addIndex('voyages', ['destinationId']);
    await queryInterface.addIndex('voyages', ['dateDepart']);
    await queryInterface.addIndex('voyages', ['typeVoyage']);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('voyages');
  }
};
