// orders.js – inicializa a página de listagem de ordens de serviço
// O router chamará window.initOrders() quando #orders for carregado

async function initOrders() {
    try {
        const res = await window.api.getOrders();
        const orders = res.data || [];
        const tbody = document.querySelector('#orders-table tbody');
        tbody.innerHTML = '';
        if (orders.length === 0) {
            const tr = document.createElement('tr');
            const td = document.createElement('td');
            td.colSpan = 5;
            td.className = 'p-4 text-center text-muted';
            td.textContent = 'Nenhuma ordem de serviço encontrada.';
            tr.appendChild(td);
            tbody.appendChild(tr);
            return;
        }
        orders.forEach((order, idx) => {
            const tr = document.createElement('tr');
            tr.className = idx % 2 === 0 ? 'bg-surface' : '';
            // ID
            const tdId = document.createElement('td');
            tdId.className = 'p-2';
            tdId.textContent = order.id ?? idx + 1;
            tr.appendChild(tdId);
            // Cliente (assume order.clientName)
            const tdClient = document.createElement('td');
            tdClient.className = 'p-2';
            tdClient.textContent = order.clientName || '—';
            tr.appendChild(tdClient);
            // Status
            const tdStatus = document.createElement('td');
            tdStatus.className = 'p-2';
            tdStatus.textContent = order.status || 'Aberto';
            tr.appendChild(tdStatus);
            // Data (assume order.created_at)
            const tdDate = document.createElement('td');
            tdDate.className = 'p-2';
            const date = order.created_at ? new Date(order.created_at) : new Date();
            tdDate.textContent = date.toLocaleDateString('pt-BR');
            tr.appendChild(tdDate);
            // Ações
            const tdActions = document.createElement('td');
            tdActions.className = 'p-2 flex gap-2';
            // Visualizar
            const viewBtn = document.createElement('button');
            viewBtn.className = 'btn btn-secondary';
            viewBtn.textContent = 'Ver';
            viewBtn.addEventListener('click', () => showOrderDetails(order));
            tdActions.appendChild(viewBtn);
            // Editar (placeholder)
            const editBtn = document.createElement('button');
            editBtn.className = 'btn btn-primary';
            editBtn.textContent = 'Editar';
            editBtn.addEventListener('click', () => editOrder(order));
            tdActions.appendChild(editBtn);
            // Excluir
            const delBtn = document.createElement('button');
            delBtn.className = 'btn btn-primary';
            delBtn.textContent = 'Excluir';
            delBtn.addEventListener('click', async () => {
                if (confirm('Excluir esta ordem?')) {
                    try {
                        await window.api.deleteOrder(order.id);
                        initOrders(); // recarrega lista
                    } catch (e) {
                        console.error(e);
                        alert('Erro ao excluir.');
                    }
                }
            });
            tdActions.appendChild(delBtn);
            tr.appendChild(tdActions);
            tbody.appendChild(tr);
        });
    } catch (err) {
        console.error('Erro ao carregar ordens:', err);
        const tbody = document.querySelector('#orders-table tbody');
        tbody.innerHTML = '<tr><td colspan="5" class="p-4 text-center text-muted">Falha ao carregar dados.</td></tr>';
    }
}

// Funções auxiliares (modal simples) – podem ser aprimoradas depois
function showOrderDetails(order) {
    alert(`Detalhes da ordem #${order.id}\nCliente: ${order.clientName}\nStatus: ${order.status}\nData: ${new Date(order.created_at).toLocaleString('pt-BR')}`);
}
function editOrder(order) {
    alert('Função de edição ainda não implementada.');
}

// Expor ao escopo global para o router
window.initOrders = initOrders;
