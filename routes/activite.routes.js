const express = require('express');
const router = express.Router();
const { Activite, Destination, Voyage } = require('../models');

// POST /api/activites - Créer une nouvelle activité
router.post('/', async (req, res, next) => {
  try {
    const activite = await Activite.create(req.body);
    res.status(201).json({
      message: 'Activité créée avec succès',
      data: activite
    });
  } catch (error) {
    next(error);
  }
});

// GET /api/activites - Obtenir toutes les activités
router.get('/', async (req, res, next) => {
  try {
    const { type, niveauPhysique, destinationId } = req.query;
    
    const where = {};
    if (type) where.type = type;
    if (niveauPhysique) where.niveauPhysique = niveauPhysique;
    if (destinationId) where.destinationId = destinationId;
    
    const activites = await Activite.findAll({
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
      message: 'Activités récupérées avec succès',
      data: activites
    });
  } catch (error) {
    next(error);
  }
});

// GET /api/activites/:id - Obtenir une activité par ID
router.get('/:id', async (req, res, next) => {
  try {
    const activite = await Activite.findByPk(req.params.id, {
      include: [
        {
          model: Destination,
          as: 'destination'
        },
        {
          model: Voyage,
          as: 'voyages',
          through: {
            attributes: ['jour', 'ordre', 'estInclus']
          }
        }
      ]
    });
    
    if (!activite) {
      return res.status(404).json({
        error: 'Activité non trouvée'
      });
    }
    
    res.json({
      message: 'Activité récupérée avec succès',
      data: activite
    });
  } catch (error) {
    next(error);
  }
});

// PUT /api/activites/:id - Mettre à jour une activité
router.put('/:id', async (req, res, next) => {
  try {
    const activite = await Activite.findByPk(req.params.id);
    
    if (!activite) {
      return res.status(404).json({
        error: 'Activité non trouvée'
      });
    }
    
    await activite.update(req.body);
    
    res.json({
      message: 'Activité mise à jour avec succès',
      data: activite
    });
  } catch (error) {
    next(error);
  }
});

// DELETE /api/activites/:id - Supprimer une activité
router.delete('/:id', async (req, res, next) => {
  try {
    const activite = await Activite.findByPk(req.params.id);
    
    if (!activite) {
      return res.status(404).json({
        error: 'Activité non trouvée'
      });
    }
    
    await activite.destroy();
    
    res.json({
      message: 'Activité supprimée avec succès'
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
