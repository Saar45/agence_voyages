'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('hebergements', {
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
      type: {
        type: Sequelize.ENUM('Hôtel', 'Auberge', 'Camping', 'Appartement', 'Villa'),
        allowNull: false
      },
      categorie: {
        type: Sequelize.ENUM('Économique', 'Standard', 'Confort', 'Luxe'),
        allowNull: false
      },
      adresse: {
        type: Sequelize.STRING(200),
        allowNull: true
      },
      nombreEtoiles: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      equipements: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      prixNuit: {
        type: Sequelize.DECIMAL(8, 2),
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
    await queryInterface.addIndex('hebergements', ['destinationId']);
    await queryInterface.addIndex('hebergements', ['type']);
    await queryInterface.addIndex('hebergements', ['categorie']);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('hebergements');
  }
};
