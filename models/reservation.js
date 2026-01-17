'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Reservation extends Model {
    static associate(models) {
      // Relation N:1 avec Client
      Reservation.belongsTo(models.Client, {
        foreignKey: 'clientId',
        as: 'client'
      });
      
      // Relation N:1 avec Voyage
      Reservation.belongsTo(models.Voyage, {
        foreignKey: 'voyageId',
        as: 'voyage'
      });
    }
  }
  
  Reservation.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    clientId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'clients',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    voyageId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'voyages',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    dateReservation: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    nombrePersonnes: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: 'Le nombre de personnes est obligatoire' },
        min: {
          args: [1],
          msg: 'Le nombre de personnes doit être au minimum 1'
        }
      }
    },
    prixTotal: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        notNull: { msg: 'Le prix total est obligatoire' },
        min: {
          args: [0.01],
          msg: 'Le prix total doit être supérieur à 0'
        }
      }
    },
    statut: {
      type: DataTypes.ENUM('Confirmée', 'En attente', 'Annulée'),
      allowNull: false,
      defaultValue: 'En attente',
      validate: {
        isIn: {
          args: [['Confirmée', 'En attente', 'Annulée']],
          msg: 'Statut invalide'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Reservation',
    tableName: 'reservations',
    timestamps: true
  });
  
  return Reservation;
};
