'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Hebergement extends Model {
    static associate(models) {
      // Relation N:1 avec Destination
      Hebergement.belongsTo(models.Destination, {
        foreignKey: 'destinationId',
        as: 'destination'
      });
    }
  }
  
  Hebergement.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nom: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notNull: { msg: 'Le nom de l\'hébergement est obligatoire' },
        notEmpty: { msg: 'Le nom ne peut pas être vide' }
      }
    },
    type: {
      type: DataTypes.ENUM('Hôtel', 'Auberge', 'Camping', 'Appartement', 'Villa'),
      allowNull: false,
      validate: {
        notNull: { msg: 'Le type d\'hébergement est obligatoire' },
        isIn: {
          args: [['Hôtel', 'Auberge', 'Camping', 'Appartement', 'Villa']],
          msg: 'Type d\'hébergement invalide'
        }
      }
    },
    categorie: {
      type: DataTypes.ENUM('Économique', 'Standard', 'Confort', 'Luxe'),
      allowNull: false,
      validate: {
        notNull: { msg: 'La catégorie est obligatoire' },
        isIn: {
          args: [['Économique', 'Standard', 'Confort', 'Luxe']],
          msg: 'Catégorie invalide'
        }
      }
    },
    adresse: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    nombreEtoiles: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        min: {
          args: [1],
          msg: 'Le nombre d\'étoiles doit être au minimum 1'
        },
        max: {
          args: [5],
          msg: 'Le nombre d\'étoiles ne peut pas dépasser 5'
        }
      }
    },
    equipements: {
      type: DataTypes.TEXT,
      allowNull: true,
      get() {
        const rawValue = this.getDataValue('equipements');
        return rawValue ? JSON.parse(rawValue) : null;
      },
      set(value) {
        this.setDataValue('equipements', value ? JSON.stringify(value) : null);
      }
    },
    prixNuit: {
      type: DataTypes.DECIMAL(8, 2),
      allowNull: true,
      validate: {
        min: {
          args: [0.01],
          msg: 'Le prix par nuit doit être supérieur à 0'
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
    modelName: 'Hebergement',
    tableName: 'hebergements',
    timestamps: true
  });
  
  return Hebergement;
};
