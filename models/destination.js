'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Destination extends Model {
    static associate(models) {
      // Relation 1:N avec Voyage
      Destination.hasMany(models.Voyage, {
        foreignKey: 'destinationId',
        as: 'voyages',
        onDelete: 'CASCADE'
      });
      
      // Relation 1:N avec Hebergement
      Destination.hasMany(models.Hebergement, {
        foreignKey: 'destinationId',
        as: 'hebergements',
        onDelete: 'CASCADE'
      });
      
      // Relation 1:N avec Activite
      Destination.hasMany(models.Activite, {
        foreignKey: 'destinationId',
        as: 'activites',
        onDelete: 'CASCADE'
      });
    }
  }
  
  Destination.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nom: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notNull: { msg: 'Le nom de la destination est obligatoire' },
        notEmpty: { msg: 'Le nom ne peut pas être vide' }
      }
    },
    pays: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        notNull: { msg: 'Le pays est obligatoire' },
        notEmpty: { msg: 'Le pays ne peut pas être vide' }
      }
    },
    continent: {
      type: DataTypes.ENUM('Europe', 'Asie', 'Amérique', 'Afrique', 'Océanie', 'Antarctique'),
      allowNull: false,
      validate: {
        notNull: { msg: 'Le continent est obligatoire' },
        isIn: {
          args: [['Europe', 'Asie', 'Amérique', 'Afrique', 'Océanie', 'Antarctique']],
          msg: 'Continent invalide'
        }
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    climat: {
      type: DataTypes.ENUM('Tropical', 'Désertique', 'Tempéré', 'Polaire', 'Montagnard'),
      allowNull: true,
      validate: {
        isIn: {
          args: [['Tropical', 'Désertique', 'Tempéré', 'Polaire', 'Montagnard']],
          msg: 'Type de climat invalide'
        }
      }
    },
    meilleurePeriode: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    langues: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    monnaie: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  }, {
    sequelize,
    modelName: 'Destination',
    tableName: 'destinations',
    timestamps: true
  });
  
  return Destination;
};
