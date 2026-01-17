'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Activite extends Model {
    static associate(models) {
      // Relation N:1 avec Destination
      Activite.belongsTo(models.Destination, {
        foreignKey: 'destinationId',
        as: 'destination'
      });
      
      // Relation N:M avec Voyage via VoyageActivite
      Activite.belongsToMany(models.Voyage, {
        through: models.VoyageActivite,
        foreignKey: 'activiteId',
        otherKey: 'voyageId',
        as: 'voyages'
      });
      
      // Relation 1:N avec VoyageActivite
      Activite.hasMany(models.VoyageActivite, {
        foreignKey: 'activiteId',
        as: 'voyageActivites',
        onDelete: 'CASCADE'
      });
    }
  }
  
  Activite.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nom: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notNull: { msg: 'Le nom de l\'activité est obligatoire' },
        notEmpty: { msg: 'Le nom ne peut pas être vide' }
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    dureeHeures: {
      type: DataTypes.DECIMAL(4, 1),
      allowNull: true,
      validate: {
        min: {
          args: [0.1],
          msg: 'La durée doit être supérieure à 0'
        }
      }
    },
    prix: {
      type: DataTypes.DECIMAL(8, 2),
      allowNull: true,
      validate: {
        min: {
          args: [0.01],
          msg: 'Le prix doit être supérieur à 0'
        }
      }
    },
    type: {
      type: DataTypes.ENUM('Visite', 'Sport', 'Gastronomie', 'Shopping', 'Spectacle'),
      allowNull: false,
      validate: {
        notNull: { msg: 'Le type d\'activité est obligatoire' },
        isIn: {
          args: [['Visite', 'Sport', 'Gastronomie', 'Shopping', 'Spectacle']],
          msg: 'Type d\'activité invalide'
        }
      }
    },
    niveauPhysique: {
      type: DataTypes.ENUM('Faible', 'Modéré', 'Élevé'),
      allowNull: true,
      validate: {
        isIn: {
          args: [['Faible', 'Modéré', 'Élevé']],
          msg: 'Niveau physique invalide'
        }
      }
    },
    ageMinimum: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
        min: {
          args: [0],
          msg: 'L\'âge minimum ne peut pas être négatif'
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
    modelName: 'Activite',
    tableName: 'activites',
    timestamps: true
  });
  
  return Activite;
};
