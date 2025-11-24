// clients.js – initialize the clients page
// The router will call window.initClients() when #clients is loaded

async function initClients() {
    try {
        const res = await window.api.getClients();
        const clients = res.data || [];
        const tbody = document.querySelector('#clients-table tbody');
        tbody.innerHTML = '';
        if (clients.length === 0) {
            const tr = document.createElement('tr');
            const td = document.createElement('td');
            td.colSpan = 6;
            td.className = 'p-4 text-center text-muted';
            td.textContent = 'Nenhum cliente encontrado.';
            tr.appendChild(td);
            tbody.appendChild(tr);
            return;
        }
        clients.forEach((client, idx) => {
            const tr = document.createElement('tr');
            tr.className = idx % 2 === 0 ? 'bg-surface' : '';
            // ID
            const tdId = document.createElement('td');
            tdId.className = 'p-2';
            tdId.textContent = client.id ?? idx + 1;
            tr.appendChild(tdId);
            // Name
            const tdName = document.createElement('td');
            tdName.className = 'p-2';
            tdName.textContent = client.name || '—';
            tr.appendChild(tdName);
            // Company
            const tdCompany = document.createElement('td');
            tdCompany.className = 'p-2';
            tdCompany.textContent = client.company || '—';
            tr.appendChild(tdCompany);
            // Email
            const tdEmail = document.createElement('td');
            tdEmail.className = 'p-2';
            tdEmail.textContent = client.email || '—';
            tr.appendChild(tdEmail);
            // Phone
            const tdPhone = document.createElement('td');
            tdPhone.className = 'p-2';
            tdPhone.textContent = client.phone || '—';
            tr.appendChild(tdPhone);
            // Actions
            const tdActions = document.createElement('td');
            tdActions.className = 'p-2 flex gap-2';
            const viewBtn = document.createElement('button');
            viewBtn.className = 'btn btn-secondary';
            viewBtn.textContent = 'Ver';
            viewBtn.addEventListener('click', () => showClientDetails(client));
            tdActions.appendChild(viewBtn);
            const editBtn = document.createElement('button');
            editBtn.className = 'btn btn-primary';
            editBtn.textContent = 'Editar';
            editBtn.addEventListener('click', () => editClient(client));
            tdActions.appendChild(editBtn);
            const delBtn = document.createElement('button');
            delBtn.className = 'btn btn-primary';
            delBtn.textContent = 'Excluir';
            delBtn.addEventListener('click', async () => {
                if (confirm('Excluir este cliente?')) {
                    try {
                        await window.api.deleteClient(client.id);
                        initClients();
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
        console.error('Erro ao carregar clientes:', err);
        const tbody = document.querySelector('#clients-table tbody');
        tbody.innerHTML = '<tr><td colspan="6" class="p-4 text-center text-muted">Falha ao carregar dados.</td></tr>';
    }
}

function showClientDetails(client) {
    alert(`ID: ${client.id}\nNome: ${client.name}\nEmpresa: ${client.company}\nE‑mail: ${client.email}\nTelefone: ${client.phone}`);
}
function editClient(client) {
    alert('Função de edição ainda não implementada.');
}

window.initClients = initClients;
