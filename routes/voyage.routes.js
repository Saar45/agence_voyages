const express = require('express');
const router = express.Router();
const { Voyage, Destination, Activite, Reservation, Client, VoyageActivite } = require('../models');
const { Op } = require('sequelize');

// POST /api/voyages - Créer un nouveau voyage
router.post('/', async (req, res, next) => {
  try {
    const voyage = await Voyage.create(req.body);
    res.status(201).json({
      message: 'Voyage créé avec succès',
      data: voyage
    });
  } catch (error) {
    next(error);
  }
});

// GET /api/voyages - Obtenir tous les voyages
router.get('/', async (req, res, next) => {
  try {
    const { page = 1, limit = 10, typeVoyage, niveauDifficulte } = req.query;
    const offset = (page - 1) * limit;
    
    const where = {};
    if (typeVoyage) where.typeVoyage = typeVoyage;
    if (niveauDifficulte) where.niveauDifficulte = niveauDifficulte;
    
    const { count, rows: voyages } = await Voyage.findAndCountAll({
      where,
      include: [
        {
          model: Destination,
          as: 'destination',
          attributes: ['id', 'nom', 'pays', 'continent']
        }
      ],
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['dateDepart', 'ASC']]
    });
    
    res.json({
      message: 'Voyages récupérés avec succès',
      data: voyages,
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

// GET /api/voyages/prochains - Obtenir les voyages à venir
router.get('/prochains', async (req, res, next) => {
  try {
    const voyages = await Voyage.findAll({
      where: {
        dateDepart: {
          [Op.gte]: new Date()
        },
        placesDisponibles: {
          [Op.gt]: 0
        }
      },
      include: [
        {
          model: Destination,
          as: 'destination',
          attributes: ['id', 'nom', 'pays', 'continent']
        }
      ],
      order: [['dateDepart', 'ASC']],
      limit: 20
    });
    
    res.json({
      message: 'Voyages à venir récupérés avec succès',
      data: voyages
    });
  } catch (error) {
    next(error);
  }
});

// GET /api/voyages/:id - Obtenir un voyage par ID
router.get('/:id', async (req, res, next) => {
  try {
    const voyage = await Voyage.findByPk(req.params.id, {
      include: [
        {
          model: Destination,
          as: 'destination'
        },
        {
          model: Activite,
          as: 'activites',
          through: {
            attributes: ['jour', 'ordre', 'estInclus']
          }
        },
        {
          model: Reservation,
          as: 'reservations',
          include: [
            {
              model: Client,
              as: 'client',
              attributes: ['id', 'nom', 'prenom', 'email']
            }
          ]
        }
      ]
    });
    
    if (!voyage) {
      return res.status(404).json({
        error: 'Voyage non trouvé'
      });
    }
    
    res.json({
      message: 'Voyage récupéré avec succès',
      data: voyage
    });
  } catch (error) {
    next(error);
  }
});

// POST /api/voyages/:id/reserver - Réserver un voyage
router.post('/:id/reserver', async (req, res, next) => {
  try {
    const { clientId, nombrePersonnes } = req.body;
    
    if (!clientId || !nombrePersonnes) {
      return res.status(400).json({
        error: 'clientId et nombrePersonnes sont requis'
      });
    }
    
    const voyage = await Voyage.findByPk(req.params.id);
    
    if (!voyage) {
      return res.status(404).json({
        error: 'Voyage non trouvé'
      });
    }
    
    // Vérifier les places disponibles
    if (voyage.placesDisponibles < nombrePersonnes) {
      return res.status(400).json({
        error: 'Pas assez de places disponibles',
        placesDisponibles: voyage.placesDisponibles
      });
    }
    
    // Vérifier que le voyage n'est pas déjà passé
    if (new Date(voyage.dateDepart) < new Date()) {
      return res.status(400).json({
        error: 'Ce voyage est déjà passé'
      });
    }
    
    // Calculer le prix total
    const prixTotal = parseFloat(voyage.prixBase) * nombrePersonnes;
    
    // Créer la réservation
    const reservation = await Reservation.create({
      clientId,
      voyageId: req.params.id,
      nombrePersonnes,
      prixTotal,
      statut: 'Confirmée'
    });
    
    // Mettre à jour les places disponibles
    await voyage.update({
      placesDisponibles: voyage.placesDisponibles - nombrePersonnes
    });
    
    res.status(201).json({
      message: 'Réservation effectuée avec succès',
      data: reservation
    });
  } catch (error) {
    next(error);
  }
});

// POST /api/voyages/:id/activites - Ajouter une activité à un voyage
router.post('/:id/activites', async (req, res, next) => {
  try {
    const { activiteId, jour, ordre, estInclus = true } = req.body;
    
    const voyage = await Voyage.findByPk(req.params.id);
    if (!voyage) {
      return res.status(404).json({
        error: 'Voyage non trouvé'
      });
    }
    
    const activite = await Activite.findByPk(activiteId);
    if (!activite) {
      return res.status(404).json({
        error: 'Activité non trouvée'
      });
    }
    
    const voyageActivite = await VoyageActivite.create({
      voyageId: req.params.id,
      activiteId,
      jour,
      ordre,
      estInclus
    });
    
    res.status(201).json({
      message: 'Activité ajoutée au voyage avec succès',
      data: voyageActivite
    });
  } catch (error) {
    next(error);
  }
});

// PUT /api/voyages/:id - Mettre à jour un voyage
router.put('/:id', async (req, res, next) => {
  try {
    const voyage = await Voyage.findByPk(req.params.id);
    
    if (!voyage) {
      return res.status(404).json({
        error: 'Voyage non trouvé'
      });
    }
    
    await voyage.update(req.body);
    
    res.json({
      message: 'Voyage mis à jour avec succès',
      data: voyage
    });
  } catch (error) {
    next(error);
  }
});

// DELETE /api/voyages/:id - Supprimer un voyage
router.delete('/:id', async (req, res, next) => {
  try {
    const voyage = await Voyage.findByPk(req.params.id);
    
    if (!voyage) {
      return res.status(404).json({
        error: 'Voyage non trouvé'
      });
    }
    
    await voyage.destroy();
    
    res.json({
      message: 'Voyage supprimé avec succès'
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
