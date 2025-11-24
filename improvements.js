// ============================================
// 🎯 MELHORIAS - Sistema de Máscaras e Validações
// ============================================

// Máscara de CPF: 000.000.000-00
function maskCPF(value) {
    return value
        .replace(/\D/g, '')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})/, '$1-$2')
        .replace(/(-\d{2})\d+?$/, '$1');
}

// Máscara de CNPJ: 00.000.000/0000-00
function maskCNPJ(value) {
    return value
        .replace(/\D/g, '')
        .replace(/(\d{2})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1/$2')
        .replace(/(\d{4})(\d)/, '$1-$2')
        .replace(/(-\d{2})\d+?$/, '$1');
}

// Máscara de Telefone: (00) 00000-0000
function maskPhone(value) {
    return value
        .replace(/\D/g, '')
        .replace(/(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{5})(\d)/, '$1-$2')
        .replace(/(-\d{4})\d+?$/, '$1');
}

// Máscara de CEP: 00000-000
function maskCEP(value) {
    return value
        .replace(/\D/g, '')
        .replace(/(\d{5})(\d)/, '$1-$2')
        .replace(/(-\d{3})\d+?$/, '$1');
}

// Validação de CPF
function validateCPF(cpf) {
    cpf = cpf.replace(/\D/g, '');
    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

    let sum = 0;
    for (let i = 0; i < 9; i++) {
        sum += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let digit = 11 - (sum % 11);
    if (digit > 9) digit = 0;
    if (digit !== parseInt(cpf.charAt(9))) return false;

    sum = 0;
    for (let i = 0; i < 10; i++) {
        sum += parseInt(cpf.charAt(i)) * (11 - i);
    }
    digit = 11 - (sum % 11);
    if (digit > 9) digit = 0;
    if (digit !== parseInt(cpf.charAt(10))) return false;

    return true;
}

// Validação de CNPJ
function validateCNPJ(cnpj) {
    cnpj = cnpj.replace(/\D/g, '');
    if (cnpj.length !== 14 || /^(\d)\1+$/.test(cnpj)) return false;

    let length = cnpj.length - 2;
    let numbers = cnpj.substring(0, length);
    const digits = cnpj.substring(length);
    let sum = 0;
    let pos = length - 7;

    for (let i = length; i >= 1; i--) {
        sum += numbers.charAt(length - i) * pos--;
        if (pos < 2) pos = 9;
    }

    let result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    if (result != digits.charAt(0)) return false;

    length = length + 1;
    numbers = cnpj.substring(0, length);
    sum = 0;
    pos = length - 7;

    for (let i = length; i >= 1; i--) {
        sum += numbers.charAt(length - i) * pos--;
        if (pos < 2) pos = 9;
    }

    result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    if (result != digits.charAt(1)) return false;

    return true;
}

// Validação de Email
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Busca de CEP via ViaCEP
async function searchCEP(cep) {
    cep = cep.replace(/\D/g, '');
    if (cep.length !== 8) return null;

    try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();
        if (data.erro) return null;
        return data;
    } catch (error) {
        console.error('Erro ao buscar CEP:', error);
        return null;
    }
}

// ============================================
// 🎯 MELHORIAS - Gestão de Vendas
// ============================================

let saleProducts = [];

function populateSaleProductSelect() {
    const select = document.getElementById('sale-product-select');
    if (!select) return;

    select.innerHTML = '<option value="">Escolha um produto</option>';

    inventory.forEach(product => {
        if (product.quantity > 0) {
            const option = document.createElement('option');
            option.value = product.id;
            option.textContent = `${product.name} - ${product.sku} (${product.quantity} disponível)`;
            option.dataset.price = product.price;
            option.dataset.quantity = product.quantity;
            select.appendChild(option);
        }
    });
}

function addProductToSale() {
    const select = document.getElementById('sale-product-select');
    const qtyInput = document.getElementById('sale-product-qty');
    const productId = parseInt(select.value);
    const qty = parseInt(qtyInput.value);

    if (!productId) {
        return showToast('Erro', 'Selecione um produto');
    }

    if (qty <= 0) {
        return showToast('Erro', 'Quantidade deve ser maior que zero');
    }

    const product = inventory.find(p => p.id === productId);
    if (!product) return;

    if (product.quantity < qty) {
        return showToast('Estoque Insuficiente', `Apenas ${product.quantity} unidade(s) disponível(eis)`);
    }

    const existing = saleProducts.find(p => p.id === productId);
    if (existing) {
        const newQty = existing.qty + qty;
        if (newQty > product.quantity) {
            return showToast('Estoque Insuficiente', `Apenas ${product.quantity} unidade(s) disponível(eis)`);
        }
        existing.qty = newQty;
    } else {
        saleProducts.push({
            id: product.id,
            name: product.name,
            sku: product.sku,
            price: product.price,
            qty: qty
        });
    }

    renderSaleProducts();
    calculateSaleTotals();

    // Reset
    select.selectedIndex = 0;
    qtyInput.value = 1;
}

function removeProductFromSale(productId) {
    saleProducts = saleProducts.filter(p => p.id !== productId);
    renderSaleProducts();
    calculateSaleTotals();
}

function renderSaleProducts() {
    const tbody = document.getElementById('sale-products-list');
    if (!tbody) return;

    if (saleProducts.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" style="text-align: center; color: var(--text-secondary);">Nenhum produto adicionado</td></tr>';
        return;
    }

    tbody.innerHTML = '';
    saleProducts.forEach(product => {
        const tr = document.createElement('tr');
        const total = product.price * product.qty;
        tr.innerHTML = `
            <td>${product.name}</td>
            <td>${product.qty}</td>
            <td>R$ ${product.price.toFixed(2)}</td>
            <td>R$ ${total.toFixed(2)}</td>
            <td>
                <button type="button" class="action-btn delete-btn" onclick="removeProductFromSale(${product.id})" title="Remover">🗑️</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function calculateSaleTotals() {
    const subtotal = saleProducts.reduce((sum, p) => sum + (p.price * p.qty), 0);
    const discountType = document.getElementById('sale-discount-type').value;
    const discountValue = parseFloat(document.getElementById('sale-discount-value').value) || 0;

    let discount = 0;
    if (discountType === 'percent') {
        discount = subtotal * (discountValue / 100);
    } else if (discountType === 'fixed') {
        discount = discountValue;
    }

    const total = Math.max(0, subtotal - discount);

    document.getElementById('sale-subtotal').value = `R$ ${subtotal.toFixed(2)}`;
    document.getElementById('sale-total').value = `R$ ${total.toFixed(2)}`;

    calculatePaymentTotal();
}

function calculatePaymentTotal() {
    const pix = parseFloat(document.getElementById('pay-pix').value) || 0;
    const cash = parseFloat(document.getElementById('pay-cash').value) || 0;
    const debit = parseFloat(document.getElementById('pay-debit').value) || 0;
    const credit = parseFloat(document.getElementById('pay-credit').value) || 0;
    const totalPaid = pix + cash + debit + credit;

    const totalSale = parseFloat(document.getElementById('sale-total').value.replace('R$ ', ''));

    const display = document.getElementById('total-paid-display');
    display.value = `R$ ${totalPaid.toFixed(2)}`;

    // Feedback visual
    if (totalPaid < totalSale) {
        display.style.color = 'var(--danger)';
        display.style.fontWeight = '600';
    } else if (totalPaid > totalSale) {
        display.style.color = 'var(--warning)';
        display.style.fontWeight = '600';
    } else {
        display.style.color = 'var(--success)';
        display.style.fontWeight = '600';
    }
}

// ============================================
// Exportar funções para uso global
// ============================================

window.maskCPF = maskCPF;
window.maskCNPJ = maskCNPJ;
window.maskPhone = maskPhone;
window.maskCEP = maskCEP;
window.validateCPF = validateCPF;
window.validateCNPJ = validateCNPJ;
window.validateEmail = validateEmail;
window.searchCEP = searchCEP;
window.addProductToSale = addProductToSale;
window.removeProductFromSale = removeProductFromSale;
window.calculateSaleTotals = calculateSaleTotals;
window.calculatePaymentTotal = calculatePaymentTotal;
window.populateSaleProductSelect = populateSaleProductSelect;
