# Agence de Voyages - Voyages Horizon

Système complet de gestion d'agence de voyages développé avec Node.js, Express, Sequelize et MariaDB.

## Démarrage rapide avec Docker (Recommandé)

**La méthode la plus simple !** Tout est automatique : MariaDB, phpMyAdmin et l'application.

```bash
# Lancer le projet complet
docker-compose up -d

# C'est tout ! Accédez à :
# - API : http://localhost:3000
# - phpMyAdmin : http://localhost:8080 (root/rootpassword)
```

**Guide complet** : Voir [DOCKER.md](DOCKER.md) pour toutes les commandes et la documentation Docker.

---

## Table des matières

- [Démarrage rapide avec Docker](#-démarrage-rapide-avec-docker-recommandé)
- [Installation manuelle](#installation-manuelle)
- [Fonctionnalités](#fonctionnalités)
- [Technologies](#technologies)
- [Configuration](#configuration)
- [Utilisation](#utilisation)
- [API Endpoints](#api-endpoints)
- [Modèles de données](#modèles-de-données)
- [Relations](#relations)

## Fonctionnalités

- Gestion complète des clients
- Gestion des destinations (par continent, pays, climat)
- Gestion des voyages avec différents types et niveaux de difficulté
- Système de réservation avec gestion des places disponibles
- Gestion des hébergements
- Gestion des activités
- Association entre voyages et activités
- Validations métier complètes
- API REST structurée

## Technologies

- **Node.js** - Environnement d'exécution
- **Express.js** - Framework web
- **Sequelize** - ORM pour la base de données
- **MariaDB** - Base de données relationnelle
- **Docker** - Conteneurisation et déploiement
- **phpMyAdmin** - Interface de gestion de base de données
- **dotenv** - Gestion des variables d'environnement
- **CORS** - Gestion des requêtes cross-origin

## Tester l'API

Une fois Docker démarré, testez l'API :

```bash
# Vérifier que l'API fonctionne
curl http://localhost:3000

# Obtenir toutes les destinations
curl http://localhost:3000/api/destinations

# Obtenir tous les voyages
curl http://localhost:3000/api/voyages

# Obtenir tous les clients
curl http://localhost:3000/api/clients
```

## API Endpoints

### Clients

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/clients` | Créer un nouveau client |
| GET | `/api/clients` | Obtenir tous les clients |
| GET | `/api/clients/:id` | Obtenir un client par ID |
| PUT | `/api/clients/:id` | Mettre à jour un client |
| DELETE | `/api/clients/:id` | Supprimer un client |

**Exemple de création de client** :
```json
POST /api/clients
{
  "nom": "Dupont",
  "prenom": "Marie",
  "email": "marie.dupont@email.com",
  "telephone": "+33612345678",
  "dateNaissance": "1990-05-15",
  "ville": "Paris",
  "pays": "France",
  "preferences": {
    "typeVoyage": ["Culturel", "Gastronomique"],
    "budget": "moyen"
  }
}
```

### Destinations

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/destinations` | Créer une nouvelle destination |
| GET | `/api/destinations` | Obtenir toutes les destinations |
| GET | `/api/destinations/:id` | Obtenir une destination par ID |
| GET | `/api/destinations/:id/voyages` | Obtenir les voyages d'une destination |
| GET | `/api/destinations/continent/:continent` | Obtenir les destinations par continent |
| PUT | `/api/destinations/:id` | Mettre à jour une destination |
| DELETE | `/api/destinations/:id` | Supprimer une destination |

**Exemple de création de destination** :
```json
POST /api/destinations
{
  "nom": "Paris",
  "pays": "France",
  "continent": "Europe",
  "description": "La ville lumière, capitale de la France",
  "climat": "Tempéré",
  "meilleurePeriode": "Avril à Octobre",
  "langues": "Français",
  "monnaie": "EUR",
  "isActive": true
}
```

### Voyages

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/voyages` | Créer un nouveau voyage |
| GET | `/api/voyages` | Obtenir tous les voyages |
| GET | `/api/voyages/:id` | Obtenir un voyage par ID |
| GET | `/api/voyages/prochains` | Obtenir les voyages à venir |
| POST | `/api/voyages/:id/reserver` | Réserver un voyage |
| POST | `/api/voyages/:id/activites` | Ajouter une activité à un voyage |
| PUT | `/api/voyages/:id` | Mettre à jour un voyage |
| DELETE | `/api/voyages/:id` | Supprimer un voyage |

**Exemple de création de voyage** :
```json
POST /api/voyages
{
  "titre": "Découverte de Paris en 5 jours",
  "description": "Visitez les monuments emblématiques de Paris",
  "dateDepart": "2026-06-15",
  "dateRetour": "2026-06-20",
  "dureeJours": 5,
  "prixBase": 899.00,
  "placesDisponibles": 20,
  "niveauDifficulte": "Facile",
  "typeVoyage": "Culturel",
  "destinationId": 1
}
```

**Exemple de réservation** :
```json
POST /api/voyages/1/reserver
{
  "clientId": 1,
  "nombrePersonnes": 2
}
```

### Réservations

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/reservations` | Créer une nouvelle réservation |
| GET | `/api/reservations` | Obtenir toutes les réservations |
| GET | `/api/reservations/:id` | Obtenir une réservation par ID |
| GET | `/api/reservations/client/:clientId` | Obtenir les réservations d'un client |
| GET | `/api/reservations/voyage/:voyageId` | Obtenir les réservations d'un voyage |
| PUT | `/api/reservations/:id/annuler` | Annuler une réservation |
| PUT | `/api/reservations/:id` | Mettre à jour une réservation |
| DELETE | `/api/reservations/:id` | Supprimer une réservation |

### Hébergements

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/hebergements` | Créer un nouvel hébergement |
| GET | `/api/hebergements` | Obtenir tous les hébergements |
| GET | `/api/hebergements/:id` | Obtenir un hébergement par ID |
| PUT | `/api/hebergements/:id` | Mettre à jour un hébergement |
| DELETE | `/api/hebergements/:id` | Supprimer un hébergement |

**Exemple de création d'hébergement** :
```json
POST /api/hebergements
{
  "nom": "Hôtel Le Marais",
  "type": "Hôtel",
  "categorie": "Confort",
  "adresse": "15 Rue du Temple, 75004 Paris",
  "nombreEtoiles": 4,
  "equipements": ["WiFi", "Climatisation", "Restaurant", "Bar"],
  "prixNuit": 150.00,
  "destinationId": 1
}
```

### Activités

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/activites` | Créer une nouvelle activité |
| GET | `/api/activites` | Obtenir toutes les activités |
| GET | `/api/activites/:id` | Obtenir une activité par ID |
| PUT | `/api/activites/:id` | Mettre à jour une activité |
| DELETE | `/api/activites/:id` | Supprimer une activité |

**Exemple de création d'activité** :
```json
POST /api/activites
{
  "nom": "Visite de la Tour Eiffel",
  "description": "Montée au sommet de la Tour Eiffel avec guide",
  "dureeHeures": 2.5,
  "prix": 25.00,
  "type": "Visite",
  "niveauPhysique": "Modéré",
  "ageMinimum": 0,
  "destinationId": 1
}
```

## 📊 Modèles de données

### Client
- `id`, `nom`, `prenom`, `email` (unique)
- `telephone`, `dateNaissance`, `ville`, `pays`
- `preferences` (JSON), `createdAt`

### Destination
- `id`, `nom`, `pays`, `continent`
- `description`, `climat`, `meilleurePeriode`
- `langues`, `monnaie`, `isActive`

### Voyage
- `id`, `titre`, `description`
- `dateDepart`, `dateRetour`, `dureeJours`
- `prixBase`, `placesDisponibles`
- `niveauDifficulte`, `typeVoyage`
- `destinationId` (clé étrangère)

### Hebergement
- `id`, `nom`, `type`, `categorie`
- `adresse`, `nombreEtoiles`
- `equipements` (JSON), `prixNuit`
- `destinationId` (clé étrangère)

### Activite
- `id`, `nom`, `description`
- `dureeHeures`, `prix`, `type`
- `niveauPhysique`, `ageMinimum`
- `destinationId` (clé étrangère)

### Reservation (Table de jonction)
- `id`, `clientId`, `voyageId`
- `dateReservation`, `nombrePersonnes`
- `prixTotal`, `statut`

### VoyageActivite (Table de jonction)
- `id`, `voyageId`, `activiteId`
- `jour`, `ordre`, `estInclus`

## 🔗 Relations

1. **Destination → Voyages** (1:N)
   - Une destination peut avoir plusieurs voyages

2. **Destination → Hebergements** (1:N)
   - Une destination peut avoir plusieurs hébergements

3. **Destination → Activites** (1:N)
   - Une destination peut avoir plusieurs activités

4. **Client ↔ Voyage** (N:M via Reservation)
   - Un client peut réserver plusieurs voyages
   - Un voyage peut être réservé par plusieurs clients

5. **Voyage ↔ Activite** (N:M via VoyageActivite)
   - Un voyage peut inclure plusieurs activités
   - Une activité peut être proposée dans plusieurs voyages

## Tests avec cURL ou Postman

### Créer une destination
```bash
curl -X POST http://localhost:3000/api/destinations \
  -H "Content-Type: application/json" \
  -d '{
    "nom": "Tokyo",
    "pays": "Japon",
    "continent": "Asie",
    "description": "La fascinante capitale du Japon",
    "climat": "Tempéré",
    "meilleurePeriode": "Mars à Mai, Septembre à Novembre",
    "langues": "Japonais",
    "monnaie": "JPY"
  }'
```

### Obtenir tous les voyages
```bash
curl http://localhost:3000/api/voyages
```

### Créer un client
```bash
curl -X POST http://localhost:3000/api/clients \
  -H "Content-Type: application/json" \
  -d '{
    "nom": "Martin",
    "prenom": "Jean",
    "email": "jean.martin@email.com",
    "telephone": "+33698765432",
    "ville": "Lyon",
    "pays": "France"
  }'
```

## Gérer la base de données avec phpMyAdmin

1. Ouvrez http://localhost:8080
2. Connectez-vous :
   - **Serveur** : `mariadb`
   - **Utilisateur** : `root`
   - **Mot de passe** : `rootpassword`
3. Sélectionnez la base `agence_voyages`
4. Explorez les 7 tables créées automatiquement

## Modifier le code

Le code est synchronisé en temps réel avec Docker ! 

1. Modifiez vos fichiers localement
2. L'application redémarre automatiquement (nodemon)
3. Vos changements sont immédiatement visibles

## Commandes Docker pratiques

```bash
# Voir les logs de l'application
docker-compose logs -f app

# Redémarrer après modification
docker-compose restart app

# Accéder au terminal de l'application
docker exec -it agence_voyages_app sh

# Réinitialiser complètement (supprimer les données)
docker-compose down -v
docker-compose up -d
```


## Besoin d'aide ?

### Problèmes courants

**Le port 3000 est déjà utilisé ?**
```yaml
# Modifiez dans docker-compose.yml :
ports:
  - "3001:3000"  # Utiliser le port 3001
```

**phpMyAdmin ne se connecte pas ?**
- Vérifiez que MariaDB est bien démarré : `docker-compose ps`
- Redémarrez les services : `docker-compose restart`

**Besoin de réinitialiser les données ?**
```bash
docker-compose down -v
docker-compose up -d
```

## Critères d'évaluation

- Modèles et migrations : Tous les modèles créés avec contraintes
- Associations : Toutes les relations 1:N et N:M configurées
- Routes API : Toutes les routes CRUD implémentées
- Qualité du code : Code structuré et commenté
- Validations : Validations métier et gestion d'erreurs

## Auteur

Projet réalisé par Mouhamed et Joel dans le cadre de l'apprentissage de Sequelize et de la modélisation de bases de données relationnelles.

## Besoin d'aide ?

### Problèmes courants

**Le port 3000 est déjà utilisé ?**
```yaml
# Modifiez dans docker-compose.yml :
ports:
  - "3001:3000"  # Utiliser le port 3001
```

**phpMyAdmin ne se connecte pas ?**
- Vérifiez que MariaDB est bien démarré : `docker-compose ps`
- Redémarrez les services : `docker-compose restart`

**Besoin de réinitialiser les données ?**
```bash
docker-compose down -v
docker-compose up -d
```

## Licence

Ce projet est développé à des fins pédagogiques.
---
