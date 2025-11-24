// API Client for TechAssist
// This replaces localStorage with real database calls

const API_BASE_URL = window.location.hostname === 'localhost'
    ? 'http://localhost:3000/api'
    : '/api';

class APIClient {
    // Helper method for API calls
    async request(endpoint, options = {}) {
        const url = `${API_BASE_URL}${endpoint}`;
        const config = {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
            ...options,
        };

        try {
            const response = await fetch(url, config);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'API request failed');
            }

            return data;
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    }

    // ==================== ORDERS ====================
    async getOrders(filters = {}) {
        const params = new URLSearchParams(filters);
        return this.request(`/orders?${params}`);
    }

    async createOrder(orderData) {
        return this.request('/orders', {
            method: 'POST',
            body: JSON.stringify(orderData),
        });
    }

    async updateOrder(id, updates) {
        return this.request(`/orders/${id}`, {
            method: 'PUT',
            body: JSON.stringify(updates),
        });
    }

    async deleteOrder(id) {
        return this.request(`/orders/${id}`, {
            method: 'DELETE',
        });
    }

    async getOrder(id) {
        return this.request(`/orders/${id}`);
    }

    // ==================== CLIENTS ====================
    async getClients(search = '') {
        const params = search ? `?search=${encodeURIComponent(search)}` : '';
        return this.request(`/clients${params}`);
    }

    async createClient(clientData) {
        return this.request('/clients', {
            method: 'POST',
            body: JSON.stringify(clientData),
        });
    }

    // ==================== SALES ====================
    async getSales() {
        return this.request('/sales');
    }

    async createSale(saleData) {
        return this.request('/sales', {
            method: 'POST',
            body: JSON.stringify(saleData),
        });
    }

    // ==================== INVENTORY ====================
    async getInventory() {
        return this.request('/inventory');
    }

    async createInventoryItem(itemData) {
        return this.request('/inventory', {
            method: 'POST',
            body: JSON.stringify(itemData),
        });
    }

    // ==================== EXPENSES ====================
    async getExpenses() {
        return this.request('/expenses');
    }

    async createExpense(expenseData) {
        return this.request('/expenses', {
            method: 'POST',
            body: JSON.stringify(expenseData),
        });
    }

    // ==================== INIT DB ====================
    async initDatabase() {
        return this.request('/init-db');
    }
}

// Create singleton instance
const api = new APIClient();

// Export for use in script.js
window.api = api;
