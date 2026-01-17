# 🧪 Tests et Exemples d'Utilisation

## Exemples avec cURL

### 1. Créer des Destinations

```bash
# Paris
curl -X POST http://localhost:3000/api/destinations \
  -H "Content-Type: application/json" \
  -d '{
    "nom": "Paris",
    "pays": "France",
    "continent": "Europe",
    "description": "La ville lumière, capitale de la France",
    "climat": "Tempéré",
    "meilleurePeriode": "Avril à Octobre",
    "langues": "Français",
    "monnaie": "EUR"
  }'

# Tokyo
curl -X POST http://localhost:3000/api/destinations \
  -H "Content-Type: application/json" \
  -d '{
    "nom": "Tokyo",
    "pays": "Japon",
    "continent": "Asie",
    "description": "Métropole fascinante",
    "climat": "Tempéré",
    "meilleurePeriode": "Mars à Mai",
    "langues": "Japonais",
    "monnaie": "JPY"
  }'
```

### 2. Créer des Clients

```bash
# Client 1
curl -X POST http://localhost:3000/api/clients \
  -H "Content-Type: application/json" \
  -d '{
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
  }'

# Client 2
curl -X POST http://localhost:3000/api/clients \
  -H "Content-Type: application/json" \
  -d '{
    "nom": "Martin",
    "prenom": "Jean",
    "email": "jean.martin@email.com",
    "telephone": "+33698765432",
    "dateNaissance": "1985-08-20",
    "ville": "Lyon",
    "pays": "France"
  }'
```

### 3. Créer des Voyages

```bash
# Voyage Paris
curl -X POST http://localhost:3000/api/voyages \
  -H "Content-Type: application/json" \
  -d '{
    "titre": "Découverte de Paris en 5 jours",
    "description": "Visitez les monuments emblématiques de Paris",
    "dateDepart": "2026-06-15T09:00:00",
    "dateRetour": "2026-06-20T18:00:00",
    "dureeJours": 5,
    "prixBase": 899.00,
    "placesDisponibles": 20,
    "niveauDifficulte": "Facile",
    "typeVoyage": "Culturel",
    "destinationId": 1
  }'
```

### 4. Créer des Hébergements

```bash
curl -X POST http://localhost:3000/api/hebergements \
  -H "Content-Type: application/json" \
  -d '{
    "nom": "Hôtel Le Marais",
    "type": "Hôtel",
    "categorie": "Confort",
    "adresse": "15 Rue du Temple, 75004 Paris",
    "nombreEtoiles": 4,
    "equipements": ["WiFi", "Climatisation", "Restaurant", "Bar", "Parking"],
    "prixNuit": 150.00,
    "destinationId": 1
  }'
```

### 5. Créer des Activités

```bash
# Tour Eiffel
curl -X POST http://localhost:3000/api/activites \
  -H "Content-Type: application/json" \
  -d '{
    "nom": "Visite de la Tour Eiffel",
    "description": "Montée au sommet avec guide",
    "dureeHeures": 2.5,
    "prix": 25.00,
    "type": "Visite",
    "niveauPhysique": "Modéré",
    "ageMinimum": 0,
    "destinationId": 1
  }'

# Louvre
curl -X POST http://localhost:3000/api/activites \
  -H "Content-Type: application/json" \
  -d '{
    "nom": "Musée du Louvre",
    "description": "Visite guidée des œuvres majeures",
    "dureeHeures": 3.0,
    "prix": 35.00,
    "type": "Visite",
    "niveauPhysique": "Faible",
    "ageMinimum": 0,
    "destinationId": 1
  }'
```

### 6. Ajouter des Activités à un Voyage

```bash
# Ajouter Tour Eiffel au voyage 1 (jour 1)
curl -X POST http://localhost:3000/api/voyages/1/activites \
  -H "Content-Type: application/json" \
  -d '{
    "activiteId": 1,
    "jour": 1,
    "ordre": 1,
    "estInclus": true
  }'

# Ajouter Louvre au voyage 1 (jour 2)
curl -X POST http://localhost:3000/api/voyages/1/activites \
  -H "Content-Type: application/json" \
  -d '{
    "activiteId": 2,
    "jour": 2,
    "ordre": 1,
    "estInclus": true
  }'
```

### 7. Réserver un Voyage

```bash
# Client 1 réserve le voyage 1 pour 2 personnes
curl -X POST http://localhost:3000/api/voyages/1/reserver \
  -H "Content-Type: application/json" \
  -d '{
    "clientId": 1,
    "nombrePersonnes": 2
  }'
```

### 8. Consulter les Données

```bash
# Toutes les destinations
curl http://localhost:3000/api/destinations

# Destinations d'Europe
curl http://localhost:3000/api/destinations/continent/Europe

# Voyage avec tous ses détails
curl http://localhost:3000/api/voyages/1

# Voyages à venir
curl http://localhost:3000/api/voyages/prochains

# Réservations d'un client
curl http://localhost:3000/api/reservations/client/1

# Voyages d'une destination
curl http://localhost:3000/api/destinations/1/voyages

# Client avec ses réservations
curl http://localhost:3000/api/clients/1
```

### 9. Filtrer les Données

```bash
# Voyages culturels
curl 'http://localhost:3000/api/voyages?typeVoyage=Culturel'

# Voyages faciles
curl 'http://localhost:3000/api/voyages?niveauDifficulte=Facile'

# Hébergements de type Hôtel
curl 'http://localhost:3000/api/hebergements?type=Hôtel'

# Activités de type Sport
curl 'http://localhost:3000/api/activites?type=Sport'

# Clients avec pagination
curl 'http://localhost:3000/api/clients?page=1&limit=5'
```

### 10. Mettre à Jour

```bash
# Mettre à jour un client
curl -X PUT http://localhost:3000/api/clients/1 \
  -H "Content-Type: application/json" \
  -d '{
    "telephone": "+33699999999",
    "ville": "Bordeaux"
  }'

# Mettre à jour un voyage (changer le prix)
curl -X PUT http://localhost:3000/api/voyages/1 \
  -H "Content-Type: application/json" \
  -d '{
    "prixBase": 799.00
  }'
```

### 11. Annuler une Réservation

```bash
# Annuler la réservation 1
curl -X PUT http://localhost:3000/api/reservations/1/annuler
```

### 12. Supprimer

```bash
# Supprimer un client
curl -X DELETE http://localhost:3000/api/clients/3

# Supprimer une activité
curl -X DELETE http://localhost:3000/api/activites/5
```

## Scénario Complet de Test

Voici un scénario complet pour tester toutes les fonctionnalités :

```bash
# 1. Créer une destination
DEST_RESPONSE=$(curl -s -X POST http://localhost:3000/api/destinations \
  -H "Content-Type: application/json" \
  -d '{
    "nom": "Bali",
    "pays": "Indonésie",
    "continent": "Asie",
    "climat": "Tropical",
    "meilleurePeriode": "Avril à Octobre",
    "langues": "Indonésien",
    "monnaie": "IDR"
  }')

echo "Destination créée : $DEST_RESPONSE"

# 2. Créer un client
CLIENT_RESPONSE=$(curl -s -X POST http://localhost:3000/api/clients \
  -H "Content-Type: application/json" \
  -d '{
    "nom": "Durand",
    "prenom": "Pierre",
    "email": "pierre.durand@email.com",
    "ville": "Nice",
    "pays": "France"
  }')

echo "Client créé : $CLIENT_RESPONSE"

# 3. Créer un voyage
VOYAGE_RESPONSE=$(curl -s -X POST http://localhost:3000/api/voyages \
  -H "Content-Type: application/json" \
  -d '{
    "titre": "Bali Paradisiaque",
    "description": "Découverte de Bali",
    "dateDepart": "2026-07-01T09:00:00",
    "dateRetour": "2026-07-15T18:00:00",
    "dureeJours": 14,
    "prixBase": 1599.00,
    "placesDisponibles": 10,
    "niveauDifficulte": "Facile",
    "typeVoyage": "Balnéaire",
    "destinationId": 3
  }')

echo "Voyage créé : $VOYAGE_RESPONSE"

# 4. Vérifier les voyages disponibles
curl http://localhost:3000/api/voyages/prochains

# 5. Réserver le voyage
RESERVATION_RESPONSE=$(curl -s -X POST http://localhost:3000/api/voyages/3/reserver \
  -H "Content-Type: application/json" \
  -d '{
    "clientId": 3,
    "nombrePersonnes": 2
  }')

echo "Réservation créée : $RESERVATION_RESPONSE"

# 6. Vérifier les réservations du client
curl http://localhost:3000/api/reservations/client/3
```

## Tests de Validation

### Tester les validations

```bash
# Email invalide (doit échouer)
curl -X POST http://localhost:3000/api/clients \
  -H "Content-Type: application/json" \
  -d '{
    "nom": "Test",
    "prenom": "User",
    "email": "email-invalide"
  }'

# Prix négatif (doit échouer)
curl -X POST http://localhost:3000/api/voyages \
  -H "Content-Type: application/json" \
  -d '{
    "titre": "Test",
    "dateDepart": "2026-06-15",
    "dateRetour": "2026-06-20",
    "prixBase": -100,
    "destinationId": 1
  }'

# Date retour avant date départ (doit échouer)
curl -X POST http://localhost:3000/api/voyages \
  -H "Content-Type: application/json" \
  -d '{
    "titre": "Test",
    "dateDepart": "2026-06-20",
    "dateRetour": "2026-06-15",
    "prixBase": 100,
    "destinationId": 1
  }'

# Email en double (doit échouer)
curl -X POST http://localhost:3000/api/clients \
  -H "Content-Type: application/json" \
  -d '{
    "nom": "Test",
    "prenom": "User",
    "email": "marie.dupont@email.com"
  }'
```

## Utilisation avec JavaScript/Node

```javascript
// Exemple avec fetch
async function creerClient() {
  const response = await fetch('http://localhost:3000/api/clients', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      nom: 'Nouveau',
      prenom: 'Client',
      email: 'nouveau.client@email.com',
      ville: 'Toulouse',
      pays: 'France'
    })
  });
  
  const data = await response.json();
  console.log(data);
}

// Exemple avec axios
const axios = require('axios');

async function reserverVoyage(voyageId, clientId, nombrePersonnes) {
  try {
    const response = await axios.post(
      `http://localhost:3000/api/voyages/${voyageId}/reserver`,
      {
        clientId,
        nombrePersonnes
      }
    );
    console.log('Réservation réussie:', response.data);
  } catch (error) {
    console.error('Erreur:', error.response.data);
  }
}
```

---

**Testez toutes ces commandes pour vérifier que votre API fonctionne correctement !**
