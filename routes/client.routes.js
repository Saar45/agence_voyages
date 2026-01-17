const express = require('express');
const router = express.Router();
const { Client, Reservation, Voyage } = require('../models');

// POST /api/clients - Créer un nouveau client
router.post('/', async (req, res, next) => {
  try {
    const client = await Client.create(req.body);
    res.status(201).json({
      message: 'Client créé avec succès',
      data: client
    });
  } catch (error) {
    next(error);
  }
});

// GET /api/clients - Obtenir tous les clients
router.get('/', async (req, res, next) => {
  try {
    const { page = 1, limit = 10, pays, ville } = req.query;
    const offset = (page - 1) * limit;
    
    const where = {};
    if (pays) where.pays = pays;
    if (ville) where.ville = ville;
    
    const { count, rows: clients } = await Client.findAndCountAll({
      where,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['createdAt', 'DESC']]
    });
    
    res.json({
      message: 'Clients récupérés avec succès',
      data: clients,
      pagination: {
        total: count,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(count / limit)
      }
    });
  } catch (error) {
    next(error);
  }
});

// GET /api/clients/:id - Obtenir un client par ID
router.get('/:id', async (req, res, next) => {
  try {
    const client = await Client.findByPk(req.params.id, {
      include: [
        {
          model: Reservation,
          as: 'reservations',
          include: [
            {
              model: Voyage,
              as: 'voyage'
            }
          ]
        }
      ]
    });
    
    if (!client) {
      return res.status(404).json({
        error: 'Client non trouvé'
      });
    }
    
    res.json({
      message: 'Client récupéré avec succès',
      data: client
    });
  } catch (error) {
    next(error);
  }
});

// PUT /api/clients/:id - Mettre à jour un client
router.put('/:id', async (req, res, next) => {
  try {
    const client = await Client.findByPk(req.params.id);
    
    if (!client) {
      return res.status(404).json({
        error: 'Client non trouvé'
      });
    }
    
    await client.update(req.body);
    
    res.json({
      message: 'Client mis à jour avec succès',
      data: client
    });
  } catch (error) {
    next(error);
  }
});

// DELETE /api/clients/:id - Supprimer un client
router.delete('/:id', async (req, res, next) => {
  try {
    const client = await Client.findByPk(req.params.id);
    
    if (!client) {
      return res.status(404).json({
        error: 'Client non trouvé'
      });
    }
    
    await client.destroy();
    
    res.json({
      message: 'Client supprimé avec succès'
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
