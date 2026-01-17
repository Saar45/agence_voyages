'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class VoyageActivite extends Model {
    static associate(models) {
      // Relation N:1 avec Voyage
      VoyageActivite.belongsTo(models.Voyage, {
        foreignKey: 'voyageId',
        as: 'voyage'
      });
      
      // Relation N:1 avec Activite
      VoyageActivite.belongsTo(models.Activite, {
        foreignKey: 'activiteId',
        as: 'activite'
      });
    }
  }
  
  VoyageActivite.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
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
    activiteId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'activites',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    jour: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        min: {
          args: [1],
          msg: 'Le jour doit être au minimum 1'
        }
      }
    },
    ordre: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        min: {
          args: [1],
          msg: 'L\'ordre doit être au minimum 1'
        }
      }
    },
    type: {
      type: DataTypes.ENUM('Visite', 'Sport', 'Gastronomie', 'Shopping', 'Spectacle'),
      allowNull: true,
      validate: {
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
    estInclus: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  }, {
    sequelize,
    modelName: 'VoyageActivite',
    tableName: 'voyage_activites',
    timestamps: true
  });
  
  return VoyageActivite;
};
