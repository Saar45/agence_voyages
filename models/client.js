'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Client extends Model {
    static associate(models) {
      // Relation N:M avec Voyage via Reservation
      Client.belongsToMany(models.Voyage, {
        through: models.Reservation,
        foreignKey: 'clientId',
        otherKey: 'voyageId',
        as: 'voyages'
      });
      
      // Relation 1:N avec Reservation
      Client.hasMany(models.Reservation, {
        foreignKey: 'clientId',
        as: 'reservations',
        onDelete: 'CASCADE'
      });
    }
  }
  
  Client.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nom: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        notNull: { msg: 'Le nom est obligatoire' },
        notEmpty: { msg: 'Le nom ne peut pas être vide' },
        len: {
          args: [2, 50],
          msg: 'Le nom doit contenir entre 2 et 50 caractères'
        }
      }
    },
    prenom: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        notNull: { msg: 'Le prénom est obligatoire' },
        notEmpty: { msg: 'Le prénom ne peut pas être vide' },
        len: {
          args: [2, 50],
          msg: 'Le prénom doit contenir entre 2 et 50 caractères'
        }
      }
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: {
        msg: 'Cet email est déjà utilisé'
      },
      validate: {
        notNull: { msg: 'L\'email est obligatoire' },
        isEmail: { msg: 'Format d\'email invalide' }
      }
    },
    telephone: {
      type: DataTypes.STRING(20),
      allowNull: true,
      validate: {
        is: {
          args: /^[+]?[\d\s\-()]+$/i,
          msg: 'Format de téléphone invalide'
        }
      }
    },
    dateNaissance: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      validate: {
        isDate: { msg: 'Format de date invalide' },
        isBefore: {
          args: new Date().toISOString().split('T')[0],
          msg: 'La date de naissance doit être dans le passé'
        }
      }
    },
    ville: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    pays: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    preferences: {
      type: DataTypes.TEXT,
      allowNull: true,
      get() {
        const rawValue = this.getDataValue('preferences');
        return rawValue ? JSON.parse(rawValue) : null;
      },
      set(value) {
        this.setDataValue('preferences', value ? JSON.stringify(value) : null);
      }
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  }, {
    sequelize,
    modelName: 'Client',
    tableName: 'clients',
    timestamps: true,
    updatedAt: false
  });
  
  return Client;
};
