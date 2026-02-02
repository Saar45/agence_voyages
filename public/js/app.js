/**
 * Voyages Horizon - Frontend JavaScript
 * API interaction and UI management
 */

const API_BASE_URL = '/api';

// =============================================================================
// API Service
// =============================================================================

const api = {
  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    if (options.body && typeof options.body === 'object') {
      config.body = JSON.stringify(options.body);
    }

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Une erreur est survenue');
      }

      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  },

  // Destinations
  async getDestinations(params = {}) {
    const query = new URLSearchParams(params).toString();
    return this.request(`/destinations${query ? '?' + query : ''}`);
  },

  async getDestination(id) {
    return this.request(`/destinations/${id}`);
  },

  async createDestination(data) {
    return this.request('/destinations', { method: 'POST', body: data });
  },

  async updateDestination(id, data) {
    return this.request(`/destinations/${id}`, { method: 'PUT', body: data });
  },

  async deleteDestination(id) {
    return this.request(`/destinations/${id}`, { method: 'DELETE' });
  },

  // Voyages
  async getVoyages(params = {}) {
    const query = new URLSearchParams(params).toString();
    return this.request(`/voyages${query ? '?' + query : ''}`);
  },

  async getVoyage(id) {
    return this.request(`/voyages/${id}`);
  },

  async getUpcomingVoyages() {
    return this.request('/voyages/prochains');
  },

  async createVoyage(data) {
    return this.request('/voyages', { method: 'POST', body: data });
  },

  async updateVoyage(id, data) {
    return this.request(`/voyages/${id}`, { method: 'PUT', body: data });
  },

  async deleteVoyage(id) {
    return this.request(`/voyages/${id}`, { method: 'DELETE' });
  },

  async bookVoyage(voyageId, clientId, nombrePersonnes) {
    return this.request(`/voyages/${voyageId}/reserver`, {
      method: 'POST',
      body: { clientId, nombrePersonnes },
    });
  },

  // Clients
  async getClients(params = {}) {
    const query = new URLSearchParams(params).toString();
    return this.request(`/clients${query ? '?' + query : ''}`);
  },

  async getClient(id) {
    return this.request(`/clients/${id}`);
  },

  async createClient(data) {
    return this.request('/clients', { method: 'POST', body: data });
  },

  async updateClient(id, data) {
    return this.request(`/clients/${id}`, { method: 'PUT', body: data });
  },

  async deleteClient(id) {
    return this.request(`/clients/${id}`, { method: 'DELETE' });
  },

  // Reservations
  async getReservations(params = {}) {
    const query = new URLSearchParams(params).toString();
    return this.request(`/reservations${query ? '?' + query : ''}`);
  },

  async getReservation(id) {
    return this.request(`/reservations/${id}`);
  },

  async createReservation(data) {
    return this.request('/reservations', { method: 'POST', body: data });
  },

  async cancelReservation(id) {
    return this.request(`/reservations/${id}/annuler`, { method: 'PUT' });
  },

  async deleteReservation(id) {
    return this.request(`/reservations/${id}`, { method: 'DELETE' });
  },

  // Hébergements
  async getHebergements(params = {}) {
    const query = new URLSearchParams(params).toString();
    return this.request(`/hebergements${query ? '?' + query : ''}`);
  },

  async getHebergement(id) {
    return this.request(`/hebergements/${id}`);
  },

  async createHebergement(data) {
    return this.request('/hebergements', { method: 'POST', body: data });
  },

  async updateHebergement(id, data) {
    return this.request(`/hebergements/${id}`, { method: 'PUT', body: data });
  },

  async deleteHebergement(id) {
    return this.request(`/hebergements/${id}`, { method: 'DELETE' });
  },

  // Activités
  async getActivites(params = {}) {
    const query = new URLSearchParams(params).toString();
    return this.request(`/activites${query ? '?' + query : ''}`);
  },

  async getActivite(id) {
    return this.request(`/activites/${id}`);
  },

  async createActivite(data) {
    return this.request('/activites', { method: 'POST', body: data });
  },

  async updateActivite(id, data) {
    return this.request(`/activites/${id}`, { method: 'PUT', body: data });
  },

  async deleteActivite(id) {
    return this.request(`/activites/${id}`, { method: 'DELETE' });
  },
};

// =============================================================================
// UI Utilities
// =============================================================================

const ui = {
  showLoading(container) {
    container.innerHTML = `
      <div class="loading">
        <div class="spinner"></div>
        <p>Chargement...</p>
      </div>
    `;
  },

  showError(container, message) {
    container.innerHTML = `
      <div class="alert alert-danger">
        <span>⚠️</span>
        <span>${message}</span>
      </div>
    `;
  },

  showEmpty(container, message = 'Aucun élément trouvé', icon = '📭') {
    container.innerHTML = `
      <div class="empty-state">
        <span>${icon}</span>
        <h3>${message}</h3>
        <p>Aucune donnée à afficher pour le moment.</p>
      </div>
    `;
  },

  showAlert(message, type = 'success') {
    const alertContainer = document.getElementById('alert-container');
    if (!alertContainer) return;

    const icons = {
      success: '✅',
      danger: '❌',
      warning: '⚠️',
      info: 'ℹ️',
    };

    const alert = document.createElement('div');
    alert.className = `alert alert-${type}`;
    alert.innerHTML = `<span>${icons[type]}</span><span>${message}</span>`;
    alertContainer.appendChild(alert);

    setTimeout(() => {
      alert.remove();
    }, 5000);
  },

  formatDate(dateString) {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  },

  formatPrice(price) {
    if (price === null || price === undefined) return '-';
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
    }).format(price);
  },

  getBadgeClass(status) {
    const statusClasses = {
      Confirmée: 'badge-success',
      'En attente': 'badge-warning',
      Annulée: 'badge-danger',
      Facile: 'badge-success',
      Modéré: 'badge-warning',
      Difficile: 'badge-danger',
      Extrême: 'badge-danger',
    };
    return statusClasses[status] || 'badge-info';
  },

  getContinentIcon(continent) {
    const icons = {
      Europe: '🇪🇺',
      Asie: '🌏',
      Amérique: '🌎',
      Afrique: '🌍',
      Océanie: '🏝️',
      Antarctique: '🧊',
    };
    return icons[continent] || '🌐';
  },
};

// =============================================================================
// Modal Management
// =============================================================================

const modal = {
  open(modalId) {
    const modalElement = document.getElementById(modalId);
    if (modalElement) {
      modalElement.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  },

  close(modalId) {
    const modalElement = document.getElementById(modalId);
    if (modalElement) {
      modalElement.classList.remove('active');
      document.body.style.overflow = '';
    }
  },

  closeAll() {
    document.querySelectorAll('.modal-overlay').forEach((m) => {
      m.classList.remove('active');
    });
    document.body.style.overflow = '';
  },
};

// Close modal when clicking outside
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('modal-overlay')) {
    modal.closeAll();
  }
});

// Close modal on escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    modal.closeAll();
  }
});

// =============================================================================
// Export for use in page-specific scripts
// =============================================================================

window.VoyagesHorizon = {
  api,
  ui,
  modal,
};
