const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const db = require('./models');

// Import des routes
const clientRoutes = require('./routes/client.routes');
const destinationRoutes = require('./routes/destination.routes');
const voyageRoutes = require('./routes/voyage.routes');
const reservationRoutes = require('./routes/reservation.routes');
const hebergementRoutes = require('./routes/hebergement.routes');
const activiteRoutes = require('./routes/activite.routes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Routes de base
app.get('/api', (req, res) => {
  res.json({
    message: 'Bienvenue sur l\'API Voyages Horizon',
    version: '1.0.0',
    endpoints: {
      clients: '/api/clients',
      destinations: '/api/destinations',
      voyages: '/api/voyages',
      reservations: '/api/reservations',
      hebergements: '/api/hebergements',
      activites: '/api/activites'
    }
  });
});

// Routes API
app.use('/api/clients', clientRoutes);
app.use('/api/destinations', destinationRoutes);
app.use('/api/voyages', voyageRoutes);
app.use('/api/reservations', reservationRoutes);
app.use('/api/hebergements', hebergementRoutes);
app.use('/api/activites', activiteRoutes);

// Middleware de gestion d'erreurs
app.use((err, req, res, next) => {
  console.error(err.stack);
  
  // Erreurs de validation Sequelize
  if (err.name === 'SequelizeValidationError') {
    return res.status(400).json({
      error: 'Erreur de validation',
      details: err.errors.map(e => ({
        field: e.path,
        message: e.message
      }))
    });
  }
  
  // Erreurs de contraintes uniques
  if (err.name === 'SequelizeUniqueConstraintError') {
    return res.status(409).json({
      error: 'Conflit de données',
      message: 'Cette ressource existe déjà',
      details: err.errors.map(e => ({
        field: e.path,
        message: e.message
      }))
    });
  }
  
  // Erreurs de clés étrangères
  if (err.name === 'SequelizeForeignKeyConstraintError') {
    return res.status(400).json({
      error: 'Erreur de contrainte',
      message: 'Référence invalide à une ressource liée'
    });
  }
  
  // Erreur générique
  res.status(err.status || 500).json({
    error: err.message || 'Erreur interne du serveur'
  });
});

// Route 404
app.use((req, res) => {
  res.status(404).json({
    error: 'Route non trouvée',
    path: req.url
  });
});

// Synchronisation de la base de données et démarrage du serveur
db.sequelize.authenticate()
  .then(() => {
    console.log('Connexion à la base de données réussie');
    
    app.listen(PORT, () => {
      console.log(`Serveur démarré sur http://localhost:${PORT}`);
      console.log(`Documentation: http://localhost:${PORT}/`);
    });
  })
  .catch(err => {
    console.error('Impossible de se connecter à la base de données:', err);
    process.exit(1);
  });

module.exports = app;
