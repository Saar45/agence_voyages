const express = require('express');
const router = express.Router();
const { Hebergement, Destination } = require('../models');

// POST /api/hebergements - Créer un nouvel hébergement
router.post('/', async (req, res, next) => {
  try {
    const hebergement = await Hebergement.create(req.body);
    res.status(201).json({
      message: 'Hébergement créé avec succès',
      data: hebergement
    });
  } catch (error) {
    next(error);
  }
});

// GET /api/hebergements - Obtenir tous les hébergements
router.get('/', async (req, res, next) => {
  try {
    const { type, categorie, destinationId } = req.query;
    
    const where = {};
    if (type) where.type = type;
    if (categorie) where.categorie = categorie;
    if (destinationId) where.destinationId = destinationId;
    
    const hebergements = await Hebergement.findAll({
      where,
      include: [
        {
          model: Destination,
          as: 'destination',
          attributes: ['id', 'nom', 'pays']
        }
      ],
      order: [['nom', 'ASC']]
    });
    
    res.json({
      message: 'Hébergements récupérés avec succès',
      data: hebergements
    });
  } catch (error) {
    next(error);
  }
});

// GET /api/hebergements/:id - Obtenir un hébergement par ID
router.get('/:id', async (req, res, next) => {
  try {
    const hebergement = await Hebergement.findByPk(req.params.id, {
      include: [
        {
          model: Destination,
          as: 'destination'
        }
      ]
    });
    
    if (!hebergement) {
      return res.status(404).json({
        error: 'Hébergement non trouvé'
      });
    }
    
    res.json({
      message: 'Hébergement récupéré avec succès',
      data: hebergement
    });
  } catch (error) {
    next(error);
  }
});

// PUT /api/hebergements/:id - Mettre à jour un hébergement
router.put('/:id', async (req, res, next) => {
  try {
    const hebergement = await Hebergement.findByPk(req.params.id);
    
    if (!hebergement) {
      return res.status(404).json({
        error: 'Hébergement non trouvé'
      });
    }
    
    await hebergement.update(req.body);
    
    res.json({
      message: 'Hébergement mis à jour avec succès',
      data: hebergement
    });
  } catch (error) {
    next(error);
  }
});

// DELETE /api/hebergements/:id - Supprimer un hébergement
router.delete('/:id', async (req, res, next) => {
  try {
    const hebergement = await Hebergement.findByPk(req.params.id);
    
    if (!hebergement) {
      return res.status(404).json({
        error: 'Hébergement non trouvé'
      });
    }
    
    await hebergement.destroy();
    
    res.json({
      message: 'Hébergement supprimé avec succès'
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
