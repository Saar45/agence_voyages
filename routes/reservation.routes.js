const express = require('express');
const router = express.Router();
const { Reservation, Client, Voyage, Destination } = require('../models');

// POST /api/reservations - Créer une nouvelle réservation
router.post('/', async (req, res, next) => {
  try {
    const { clientId, voyageId, nombrePersonnes } = req.body;
    
    if (!clientId || !voyageId || !nombrePersonnes) {
      return res.status(400).json({
        error: 'clientId, voyageId et nombrePersonnes sont requis'
      });
    }
    
    const voyage = await Voyage.findByPk(voyageId);
    
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
    
    // Calculer le prix total
    const prixTotal = parseFloat(voyage.prixBase) * nombrePersonnes;
    
    // Créer la réservation
    const reservation = await Reservation.create({
      clientId,
      voyageId,
      nombrePersonnes,
      prixTotal,
      statut: req.body.statut || 'En attente'
    });
    
    // Mettre à jour les places disponibles
    await voyage.update({
      placesDisponibles: voyage.placesDisponibles - nombrePersonnes
    });
    
    res.status(201).json({
      message: 'Réservation créée avec succès',
      data: reservation
    });
  } catch (error) {
    next(error);
  }
});

// GET /api/reservations - Obtenir toutes les réservations
router.get('/', async (req, res, next) => {
  try {
    const { statut } = req.query;
    
    const where = {};
    if (statut) where.statut = statut;
    
    const reservations = await Reservation.findAll({
      where,
      include: [
        {
          model: Client,
          as: 'client',
          attributes: ['id', 'nom', 'prenom', 'email']
        },
        {
          model: Voyage,
          as: 'voyage',
          include: [
            {
              model: Destination,
              as: 'destination',
              attributes: ['id', 'nom', 'pays']
            }
          ]
        }
      ],
      order: [['dateReservation', 'DESC']]
    });
    
    res.json({
      message: 'Réservations récupérées avec succès',
      data: reservations
    });
  } catch (error) {
    next(error);
  }
});

// GET /api/reservations/client/:clientId - Obtenir les réservations d'un client
router.get('/client/:clientId', async (req, res, next) => {
  try {
    const reservations = await Reservation.findAll({
      where: { clientId: req.params.clientId },
      include: [
        {
          model: Voyage,
          as: 'voyage',
          include: [
            {
              model: Destination,
              as: 'destination'
            }
          ]
        }
      ],
      order: [['dateReservation', 'DESC']]
    });
    
    res.json({
      message: 'Réservations du client récupérées avec succès',
      data: reservations
    });
  } catch (error) {
    next(error);
  }
});

// GET /api/reservations/voyage/:voyageId - Obtenir les réservations d'un voyage
router.get('/voyage/:voyageId', async (req, res, next) => {
  try {
    const reservations = await Reservation.findAll({
      where: { voyageId: req.params.voyageId },
      include: [
        {
          model: Client,
          as: 'client',
          attributes: ['id', 'nom', 'prenom', 'email', 'telephone']
        }
      ],
      order: [['dateReservation', 'DESC']]
    });
    
    res.json({
      message: 'Réservations du voyage récupérées avec succès',
      data: reservations
    });
  } catch (error) {
    next(error);
  }
});

// GET /api/reservations/:id - Obtenir une réservation par ID
router.get('/:id', async (req, res, next) => {
  try {
    const reservation = await Reservation.findByPk(req.params.id, {
      include: [
        {
          model: Client,
          as: 'client'
        },
        {
          model: Voyage,
          as: 'voyage',
          include: [
            {
              model: Destination,
              as: 'destination'
            }
          ]
        }
      ]
    });
    
    if (!reservation) {
      return res.status(404).json({
        error: 'Réservation non trouvée'
      });
    }
    
    res.json({
      message: 'Réservation récupérée avec succès',
      data: reservation
    });
  } catch (error) {
    next(error);
  }
});

// PUT /api/reservations/:id/annuler - Annuler une réservation
router.put('/:id/annuler', async (req, res, next) => {
  try {
    const reservation = await Reservation.findByPk(req.params.id, {
      include: [
        {
          model: Voyage,
          as: 'voyage'
        }
      ]
    });
    
    if (!reservation) {
      return res.status(404).json({
        error: 'Réservation non trouvée'
      });
    }
    
    if (reservation.statut === 'Annulée') {
      return res.status(400).json({
        error: 'Cette réservation est déjà annulée'
      });
    }
    
    // Restaurer les places disponibles
    await reservation.voyage.update({
      placesDisponibles: reservation.voyage.placesDisponibles + reservation.nombrePersonnes
    });
    
    // Mettre à jour le statut
    await reservation.update({ statut: 'Annulée' });
    
    res.json({
      message: 'Réservation annulée avec succès',
      data: reservation
    });
  } catch (error) {
    next(error);
  }
});

// PUT /api/reservations/:id - Mettre à jour une réservation
router.put('/:id', async (req, res, next) => {
  try {
    const reservation = await Reservation.findByPk(req.params.id);
    
    if (!reservation) {
      return res.status(404).json({
        error: 'Réservation non trouvée'
      });
    }
    
    await reservation.update(req.body);
    
    res.json({
      message: 'Réservation mise à jour avec succès',
      data: reservation
    });
  } catch (error) {
    next(error);
  }
});

// DELETE /api/reservations/:id - Supprimer une réservation
router.delete('/:id', async (req, res, next) => {
  try {
    const reservation = await Reservation.findByPk(req.params.id, {
      include: [
        {
          model: Voyage,
          as: 'voyage'
        }
      ]
    });
    
    if (!reservation) {
      return res.status(404).json({
        error: 'Réservation non trouvée'
      });
    }
    
    // Restaurer les places si la réservation n'était pas déjà annulée
    if (reservation.statut !== 'Annulée') {
      await reservation.voyage.update({
        placesDisponibles: reservation.voyage.placesDisponibles + reservation.nombrePersonnes
      });
    }
    
    await reservation.destroy();
    
    res.json({
      message: 'Réservation supprimée avec succès'
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
