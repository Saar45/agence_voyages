FROM node:18-alpine

# Installer netcat et mysql-client pour les healthchecks
RUN apk add --no-cache netcat-openbsd mysql-client

# Créer le répertoire de l'application
WORKDIR /app

# Copier les fichiers package
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste de l'application
COPY . .

# Copier et rendre exécutable le script d'entrée
COPY docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

# Exposer le port
EXPOSE 3000

# Commande par défaut
ENTRYPOINT ["docker-entrypoint.sh"]
