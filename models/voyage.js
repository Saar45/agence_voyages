'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Voyage extends Model {
    static associate(models) {
      // Relation N:1 avec Destination
      Voyage.belongsTo(models.Destination, {
        foreignKey: 'destinationId',
        as: 'destination'
      });
      
      // Relation N:M avec Client via Reservation
      Voyage.belongsToMany(models.Client, {
        through: models.Reservation,
        foreignKey: 'voyageId',
        otherKey: 'clientId',
        as: 'clients'
      });
      
      // Relation 1:N avec Reservation
      Voyage.hasMany(models.Reservation, {
        foreignKey: 'voyageId',
        as: 'reservations',
        onDelete: 'CASCADE'
      });
      
      // Relation N:M avec Activite via VoyageActivite
      Voyage.belongsToMany(models.Activite, {
        through: models.VoyageActivite,
        foreignKey: 'voyageId',
        otherKey: 'activiteId',
        as: 'activites'
      });
      
      // Relation 1:N avec VoyageActivite
      Voyage.hasMany(models.VoyageActivite, {
        foreignKey: 'voyageId',
        as: 'voyageActivites',
        onDelete: 'CASCADE'
      });
    }
  }
  
  Voyage.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    titre: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notNull: { msg: 'Le titre est obligatoire' },
        notEmpty: { msg: 'Le titre ne peut pas être vide' }
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    dateDepart: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notNull: { msg: 'La date de départ est obligatoire' },
        isDate: { msg: 'Format de date invalide' }
      }
    },
    dateRetour: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notNull: { msg: 'La date de retour est obligatoire' },
        isDate: { msg: 'Format de date invalide' },
        isAfterDeparture(value) {
          if (this.dateDepart && value <= this.dateDepart) {
            throw new Error('La date de retour doit être strictement supérieure à la date de départ');
          }
        }
      }
    },
    dureeJours: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        min: {
          args: [1],
          msg: 'La durée doit être supérieure à 0'
        }
      }
    },
    prixBase: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        notNull: { msg: 'Le prix de base est obligatoire' },
        min: {
          args: [0.01],
          msg: 'Le prix doit être supérieur à 0'
        }
      }
    },
    placesDisponibles: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 20,
      validate: {
        min: {
          args: [0],
          msg: 'Le nombre de places ne peut pas être négatif'
        }
      }
    },
    niveauDifficulte: {
      type: DataTypes.ENUM('Facile', 'Modéré', 'Difficile', 'Expert'),
      allowNull: false,
      defaultValue: 'Modéré',
      validate: {
        isIn: {
          args: [['Facile', 'Modéré', 'Difficile', 'Expert']],
          msg: 'Niveau de difficulté invalide'
        }
      }
    },
    typeVoyage: {
      type: DataTypes.ENUM('Aventure', 'Culturel', 'Balnéaire', 'Gastronomique', 'Ecotourisme'),
      allowNull: true,
      validate: {
        isIn: {
          args: [['Aventure', 'Culturel', 'Balnéaire', 'Gastronomique', 'Ecotourisme']],
          msg: 'Type de voyage invalide'
        }
      }
    },
    destinationId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'destinations',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    }
  }, {
    sequelize,
    modelName: 'Voyage',
    tableName: 'voyages',
    timestamps: true
  });
  
  return Voyage;
};
