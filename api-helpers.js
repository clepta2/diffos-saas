// API Helper Functions
// Funções auxiliares para facilitar o uso da API no script.js

// ==================== ORDERS ====================
async function createOrder(orderData) {
    try {
        const result = await window.api.createOrder(orderData);
        if (result.success) {
            // Add to local array for immediate UI update
            serviceOrders.unshift(result.data);
            return result.data;
        }
        throw new Error(result.error || 'Failed to create order');
    } catch (error) {
        console.error('Error creating order:', error);
        showToast('Erro', 'Erro ao criar ordem de serviço');
        throw error;
    }
}

async function updateOrder(id, updates) {
    try {
        const result = await window.api.updateOrder(id, updates);
        if (result.success) {
            // Update local array
            const index = serviceOrders.findIndex(o => o.id === id);
            if (index !== -1) {
                serviceOrders[index] = { ...serviceOrders[index], ...updates };
            }
            return result.data;
        }
        throw new Error(result.error || 'Failed to update order');
    } catch (error) {
        console.error('Error updating order:', error);
        showToast('Erro', 'Erro ao atualizar ordem');
        throw error;
    }
}

async function deleteOrder(id) {
    try {
        const result = await window.api.deleteOrder(id);
        if (result.success) {
            // Remove from local array
            const index = serviceOrders.findIndex(o => o.id === id);
            if (index !== -1) {
                serviceOrders.splice(index, 1);
            }
            return true;
        }
        throw new Error(result.error || 'Failed to delete order');
    } catch (error) {
        console.error('Error deleting order:', error);
        showToast('Erro', 'Erro ao deletar ordem');
        throw error;
    }
}

// ==================== CLIENTS ====================
async function createClient(clientData) {
    try {
        const result = await window.api.createClient(clientData);
        if (result.success) {
            clients.unshift(result.data);
            return result.data;
        }
        throw new Error(result.error || 'Failed to create client');
    } catch (error) {
        console.error('Error creating client:', error);
        showToast('Erro', 'Erro ao criar cliente');
        throw error;
    }
}

// ==================== SALES ====================
async function createSale(saleData) {
    try {
        const result = await window.api.createSale(saleData);
        if (result.success) {
            sales.unshift(result.data);
            return result.data;
        }
        throw new Error(result.error || 'Failed to create sale');
    } catch (error) {
        console.error('Error creating sale:', error);
        showToast('Erro', 'Erro ao criar venda');
        throw error;
    }
}

// ==================== INVENTORY ====================
async function createInventoryItem(itemData) {
    try {
        const result = await window.api.createInventoryItem(itemData);
        if (result.success) {
            inventory.unshift(result.data);
            return result.data;
        }
        throw new Error(result.error || 'Failed to create item');
    } catch (error) {
        console.error('Error creating inventory item:', error);
        showToast('Erro', 'Erro ao criar item');
        throw error;
    }
}

// ==================== EXPENSES ====================
async function createExpense(expenseData) {
    try {
        const result = await window.api.createExpense(expenseData);
        if (result.success) {
            expenses.unshift(result.data);
            return result.data;
        }
        throw new Error(result.error || 'Failed to create expense');
    } catch (error) {
        console.error('Error creating expense:', error);
        showToast('Erro', 'Erro ao criar despesa');
        throw error;
    }
}

// Export to global scope
window.createOrder = createOrder;
window.updateOrder = updateOrder;
window.deleteOrder = deleteOrder;
window.createClient = createClient;
window.createSale = createSale;
window.createInventoryItem = createInventoryItem;
window.createExpense = createExpense;
