#!/bin/sh

# Couleurs
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo ""
echo "${BLUE}╔═══════════════════════════════════════════════════════════╗${NC}"
echo "${BLUE}║                                                           ║${NC}"
echo "${BLUE}║   ${GREEN}AGENCE DE VOYAGES - VOYAGES HORIZON${BLUE}                 ║${NC}"
echo "${BLUE}║                                                           ║${NC}"
echo "${BLUE}╚═══════════════════════════════════════════════════════════╝${NC}"
echo ""
echo "${GREEN}Démarrage de l'application...${NC}"
echo ""

# Fonction pour attendre que MariaDB soit vraiment prêt
wait_for_mysql() {
  echo "${YELLOW}Attente de MariaDB...${NC}"
  
  max_attempts=30
  attempt=0
  
  until nc -z mariadb 3306; do
    attempt=$((attempt + 1))
    if [ $attempt -ge $max_attempts ]; then
      echo "${RED}Erreur: MariaDB ne répond pas après $max_attempts tentatives${NC}"
      exit 1
    fi
    echo "${YELLOW}   Tentative $attempt/$max_attempts...${NC}"
    sleep 2
  done
  
  echo "${GREEN}Port 3306 ouvert !${NC}"
  
  # Attendre encore un peu pour que MariaDB soit vraiment prêt à accepter des connexions
  echo "${YELLOW}Vérification de la disponibilité de MariaDB...${NC}"
  sleep 10
  
  echo "${GREEN}MariaDB est prêt et accepte les connexions !${NC}"
  echo ""
}

# Attendre MariaDB
wait_for_mysql

# Exécuter les migrations avec retry
echo "${YELLOW}Exécution des migrations...${NC}"
max_retries=3
retry=0

until npx sequelize-cli db:migrate; do
  retry=$((retry + 1))
  if [ $retry -ge $max_retries ]; then
    echo "${RED}Erreur: Impossible d'exécuter les migrations après $max_retries tentatives${NC}"
    echo "${YELLOW}L'application va démarrer sans les migrations${NC}"
    break
  fi
  echo "${YELLOW}   Nouvelle tentative ($retry/$max_retries)...${NC}"
  sleep 3
done

if [ $retry -eq 0 ] || [ $retry -lt $max_retries ]; then
  echo "${GREEN}Migrations terminées !${NC}"
  echo ""
fi

# Exécuter les seeders
echo "${YELLOW}Insertion des données de test...${NC}"
npx sequelize-cli db:seed:all 2>/dev/null && echo "${GREEN}Données de test insérées !${NC}" || echo "${YELLOW}Données déjà présentes ou erreur${NC}"
echo ""

# Démarrer l'application
echo "${GREEN}Démarrage du serveur...${NC}"
echo ""
echo "${BLUE}╔═══════════════════════════════════════════════════════════╗${NC}"
echo "${BLUE}║  ${GREEN}Services disponibles :${BLUE}                                 ║${NC}"
echo "${BLUE}║                                                           ║${NC}"
echo "${BLUE}║  ${YELLOW}API REST:${NC}          http://localhost:3000                ${BLUE}║${NC}"
echo "${BLUE}║  ${YELLOW}phpMyAdmin:${NC}        http://localhost:8080                ${BLUE}║${NC}"
echo "${BLUE}║                                                           ║${NC}"
echo "${BLUE}║  ${YELLOW}Identifiants phpMyAdmin :${NC}                              ${BLUE}║${NC}"
echo "${BLUE}║  • Serveur: mariadb                                      ║${NC}"
echo "${BLUE}║  • User: root                                            ║${NC}"
echo "${BLUE}║  • Password: rootpassword                                ║${NC}"
echo "${BLUE}╚═══════════════════════════════════════════════════════════╝${NC}"
echo ""
echo "${GREEN}Bon voyage dans le monde de Sequelize !${NC}"
echo ""

# Démarrer nodemon
npm run dev
