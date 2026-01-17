'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Insérer les destinations
    const destinations = await queryInterface.bulkInsert('destinations', [
      {
        nom: 'Paris',
        pays: 'France',
        continent: 'Europe',
        description: 'La ville lumière, capitale de la France, célèbre pour la Tour Eiffel, le Louvre et sa gastronomie',
        climat: 'Tempéré',
        meilleurePeriode: 'Avril à Octobre',
        langues: 'Français',
        monnaie: 'EUR',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nom: 'Tokyo',
        pays: 'Japon',
        continent: 'Asie',
        description: 'Métropole fascinante mêlant tradition et modernité',
        climat: 'Tempéré',
        meilleurePeriode: 'Mars à Mai, Septembre à Novembre',
        langues: 'Japonais',
        monnaie: 'JPY',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nom: 'Marrakech',
        pays: 'Maroc',
        continent: 'Afrique',
        description: 'La perle du Sud, ville impériale aux mille couleurs',
        climat: 'Désertique',
        meilleurePeriode: 'Mars à Mai, Septembre à Novembre',
        langues: 'Arabe, Français',
        monnaie: 'MAD',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nom: 'New York',
        pays: 'États-Unis',
        continent: 'Amérique',
        description: 'The Big Apple, ville qui ne dort jamais',
        climat: 'Tempéré',
        meilleurePeriode: 'Avril à Juin, Septembre à Novembre',
        langues: 'Anglais',
        monnaie: 'USD',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nom: 'Sydney',
        pays: 'Australie',
        continent: 'Océanie',
        description: 'Ville côtière dynamique avec son célèbre opéra',
        climat: 'Tempéré',
        meilleurePeriode: 'Septembre à Novembre, Mars à Mai',
        langues: 'Anglais',
        monnaie: 'AUD',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], { returning: true });

    // Insérer les clients
    await queryInterface.bulkInsert('clients', [
      {
        nom: 'Dupont',
        prenom: 'Marie',
        email: 'marie.dupont@email.com',
        telephone: '+33612345678',
        dateNaissance: '1990-05-15',
        ville: 'Paris',
        pays: 'France',
        preferences: JSON.stringify({ typeVoyage: ['Culturel', 'Gastronomique'], budget: 'moyen' }),
        createdAt: new Date(),
        updatedAt: null
      },
      {
        nom: 'Martin',
        prenom: 'Jean',
        email: 'jean.martin@email.com',
        telephone: '+33698765432',
        dateNaissance: '1985-08-20',
        ville: 'Lyon',
        pays: 'France',
        preferences: JSON.stringify({ typeVoyage: ['Aventure', 'Sport'], budget: 'élevé' }),
        createdAt: new Date(),
        updatedAt: null
      },
      {
        nom: 'Bernard',
        prenom: 'Sophie',
        email: 'sophie.bernard@email.com',
        telephone: '+33687654321',
        dateNaissance: '1995-03-10',
        ville: 'Marseille',
        pays: 'France',
        preferences: JSON.stringify({ typeVoyage: ['Balnéaire', 'Détente'], budget: 'moyen' }),
        createdAt: new Date(),
        updatedAt: null
      }
    ], {});

    // Insérer les voyages
    await queryInterface.bulkInsert('voyages', [
      {
        titre: 'Découverte de Paris en 5 jours',
        description: 'Visitez les monuments emblématiques de Paris : Tour Eiffel, Louvre, Notre-Dame, Champs-Élysées',
        dateDepart: '2026-06-15',
        dateRetour: '2026-06-20',
        dureeJours: 5,
        prixBase: 899.00,
        placesDisponibles: 20,
        niveauDifficulte: 'Facile',
        typeVoyage: 'Culturel',
        destinationId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        titre: 'Tokyo Express - 7 jours',
        description: 'Immersion totale dans la culture japonaise : temples, jardins, quartiers modernes',
        dateDepart: '2026-04-10',
        dateRetour: '2026-04-17',
        dureeJours: 7,
        prixBase: 1899.00,
        placesDisponibles: 15,
        niveauDifficulte: 'Modéré',
        typeVoyage: 'Culturel',
        destinationId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        titre: 'Marrakech Authentique',
        description: 'Découvrez les souks, la place Jemaa el-Fna, le jardin Majorelle et le désert',
        dateDepart: '2026-05-01',
        dateRetour: '2026-05-07',
        dureeJours: 6,
        prixBase: 699.00,
        placesDisponibles: 25,
        niveauDifficulte: 'Facile',
        typeVoyage: 'Culturel',
        destinationId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        titre: 'New York City Break',
        description: 'Manhattan, Brooklyn, Statue de la Liberté, Central Park',
        dateDepart: '2026-09-15',
        dateRetour: '2026-09-22',
        dureeJours: 7,
        prixBase: 1499.00,
        placesDisponibles: 18,
        niveauDifficulte: 'Facile',
        typeVoyage: 'Culturel',
        destinationId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});

    // Insérer les hébergements
    await queryInterface.bulkInsert('hebergements', [
      {
        nom: 'Hôtel Le Marais',
        type: 'Hôtel',
        categorie: 'Confort',
        adresse: '15 Rue du Temple, 75004 Paris',
        nombreEtoiles: 4,
        equipements: JSON.stringify(['WiFi', 'Climatisation', 'Restaurant', 'Bar', 'Parking']),
        prixNuit: 150.00,
        destinationId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nom: 'Tokyo Grand Hotel',
        type: 'Hôtel',
        categorie: 'Luxe',
        adresse: 'Shibuya, Tokyo',
        nombreEtoiles: 5,
        equipements: JSON.stringify(['WiFi', 'Spa', 'Restaurant', 'Salle de sport', 'Piscine']),
        prixNuit: 280.00,
        destinationId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nom: 'Riad Marrakech',
        type: 'Auberge',
        categorie: 'Standard',
        adresse: 'Medina, Marrakech',
        nombreEtoiles: 3,
        equipements: JSON.stringify(['WiFi', 'Patio', 'Terrasse', 'Petit-déjeuner inclus']),
        prixNuit: 80.00,
        destinationId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});

    // Insérer les activités
    await queryInterface.bulkInsert('activites', [
      {
        nom: 'Visite de la Tour Eiffel',
        description: 'Montée au sommet de la Tour Eiffel avec guide francophone',
        dureeHeures: 2.5,
        prix: 25.00,
        type: 'Visite',
        niveauPhysique: 'Modéré',
        ageMinimum: 0,
        destinationId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nom: 'Musée du Louvre',
        description: 'Visite guidée des œuvres majeures du Louvre',
        dureeHeures: 3.0,
        prix: 35.00,
        type: 'Visite',
        niveauPhysique: 'Faible',
        ageMinimum: 0,
        destinationId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nom: 'Croisière sur la Seine',
        description: 'Croisière commentée avec dîner',
        dureeHeures: 2.0,
        prix: 75.00,
        type: 'Gastronomie',
        niveauPhysique: 'Faible',
        ageMinimum: 0,
        destinationId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nom: 'Visite du temple Senso-ji',
        description: 'Découverte du plus ancien temple de Tokyo',
        dureeHeures: 2.0,
        prix: 20.00,
        type: 'Visite',
        niveauPhysique: 'Faible',
        ageMinimum: 0,
        destinationId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nom: 'Dégustation de sushi',
        description: 'Cours de préparation et dégustation',
        dureeHeures: 3.0,
        prix: 90.00,
        type: 'Gastronomie',
        niveauPhysique: 'Faible',
        ageMinimum: 12,
        destinationId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nom: 'Visite des souks',
        description: 'Promenade guidée dans les souks de Marrakech',
        dureeHeures: 3.0,
        prix: 15.00,
        type: 'Shopping',
        niveauPhysique: 'Modéré',
        ageMinimum: 0,
        destinationId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});

    // Insérer quelques réservations
    await queryInterface.bulkInsert('reservations', [
      {
        clientId: 1,
        voyageId: 1,
        dateReservation: new Date(),
        nombrePersonnes: 2,
        prixTotal: 1798.00,
        statut: 'Confirmée',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        clientId: 2,
        voyageId: 2,
        dateReservation: new Date(),
        nombrePersonnes: 1,
        prixTotal: 1899.00,
        statut: 'Confirmée',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});

    // Insérer les associations voyage-activité
    await queryInterface.bulkInsert('voyage_activites', [
      {
        voyageId: 1,
        activiteId: 1,
        jour: 1,
        ordre: 1,
        estInclus: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        voyageId: 1,
        activiteId: 2,
        jour: 2,
        ordre: 1,
        estInclus: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        voyageId: 1,
        activiteId: 3,
        jour: 4,
        ordre: 1,
        estInclus: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        voyageId: 2,
        activiteId: 4,
        jour: 1,
        ordre: 1,
        estInclus: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        voyageId: 2,
        activiteId: 5,
        jour: 3,
        ordre: 1,
        estInclus: false,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('voyage_activites', null, {});
    await queryInterface.bulkDelete('reservations', null, {});
    await queryInterface.bulkDelete('activites', null, {});
    await queryInterface.bulkDelete('hebergements', null, {});
    await queryInterface.bulkDelete('voyages', null, {});
    await queryInterface.bulkDelete('clients', null, {});
    await queryInterface.bulkDelete('destinations', null, {});
  }
};
