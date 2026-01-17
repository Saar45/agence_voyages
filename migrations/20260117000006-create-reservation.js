'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('reservations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      clientId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'clients',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
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
      dateReservation: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      nombrePersonnes: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      prixTotal: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },
      statut: {
        type: Sequelize.ENUM('Confirmée', 'En attente', 'Annulée'),
        allowNull: false,
        defaultValue: 'En attente'
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
    await queryInterface.addIndex('reservations', ['clientId']);
    await queryInterface.addIndex('reservations', ['voyageId']);
    await queryInterface.addIndex('reservations', ['statut']);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('reservations');
  }
};
