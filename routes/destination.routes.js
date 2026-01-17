const express = require('express');
const router = express.Router();
const { Destination, Voyage, Hebergement, Activite } = require('../models');
const { Op } = require('sequelize');

// POST /api/destinations - Créer une nouvelle destination
router.post('/', async (req, res, next) => {
  try {
    const destination = await Destination.create(req.body);
    res.status(201).json({
      message: 'Destination créée avec succès',
      data: destination
    });
  } catch (error) {
    next(error);
  }
});

// GET /api/destinations - Obtenir toutes les destinations
router.get('/', async (req, res, next) => {
  try {
    const { page = 1, limit = 10, continent, isActive } = req.query;
    const offset = (page - 1) * limit;
    
    const where = {};
    if (continent) where.continent = continent;
    if (isActive !== undefined) where.isActive = isActive === 'true';
    
    const { count, rows: destinations } = await Destination.findAndCountAll({
      where,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['nom', 'ASC']]
    });
    
    res.json({
      message: 'Destinations récupérées avec succès',
      data: destinations,
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

// GET /api/destinations/:id - Obtenir une destination par ID
router.get('/:id', async (req, res, next) => {
  try {
    const destination = await Destination.findByPk(req.params.id, {
      include: [
        {
          model: Voyage,
          as: 'voyages'
        },
        {
          model: Hebergement,
          as: 'hebergements'
        },
        {
          model: Activite,
          as: 'activites'
        }
      ]
    });
    
    if (!destination) {
      return res.status(404).json({
        error: 'Destination non trouvée'
      });
    }
    
    res.json({
      message: 'Destination récupérée avec succès',
      data: destination
    });
  } catch (error) {
    next(error);
  }
});

// GET /api/destinations/:id/voyages - Obtenir tous les voyages d'une destination
router.get('/:id/voyages', async (req, res, next) => {
  try {
    const destination = await Destination.findByPk(req.params.id);
    
    if (!destination) {
      return res.status(404).json({
        error: 'Destination non trouvée'
      });
    }
    
    const voyages = await Voyage.findAll({
      where: { destinationId: req.params.id },
      order: [['dateDepart', 'ASC']]
    });
    
    res.json({
      message: 'Voyages récupérés avec succès',
      data: voyages
    });
  } catch (error) {
    next(error);
  }
});

// GET /api/destinations/continent/:continent - Obtenir les destinations par continent
router.get('/continent/:continent', async (req, res, next) => {
  try {
    const { continent } = req.params;
    const validContinents = ['Europe', 'Asie', 'Amérique', 'Afrique', 'Océanie', 'Antarctique'];
    
    if (!validContinents.includes(continent)) {
      return res.status(400).json({
        error: 'Continent invalide',
        validContinents
      });
    }
    
    const destinations = await Destination.findAll({
      where: { continent },
      order: [['nom', 'ASC']]
    });
    
    res.json({
      message: `Destinations du continent ${continent} récupérées avec succès`,
      data: destinations
    });
  } catch (error) {
    next(error);
  }
});

// PUT /api/destinations/:id - Mettre à jour une destination
router.put('/:id', async (req, res, next) => {
  try {
    const destination = await Destination.findByPk(req.params.id);
    
    if (!destination) {
      return res.status(404).json({
        error: 'Destination non trouvée'
      });
    }
    
    await destination.update(req.body);
    
    res.json({
      message: 'Destination mise à jour avec succès',
      data: destination
    });
  } catch (error) {
    next(error);
  }
});

// DELETE /api/destinations/:id - Supprimer une destination
router.delete('/:id', async (req, res, next) => {
  try {
    const destination = await Destination.findByPk(req.params.id);
    
    if (!destination) {
      return res.status(404).json({
        error: 'Destination non trouvée'
      });
    }
    
    await destination.destroy();
    
    res.json({
      message: 'Destination supprimée avec succès'
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
