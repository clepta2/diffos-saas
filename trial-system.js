// ============================================
// 🔐 SISTEMA DE TRIAL E BLOQUEIO DE CONTA
// ============================================

// Estado da Conta do Usuário
let userAccount = {
    id: null,
    email: null,
    createdAt: null,

    // Trial Control
    hasUsedTrial: false,
    trialStartDate: null,
    trialEndDate: null,
    trialDaysTotal: 7, // ← 7 DIAS DE TRIAL

    // Subscription
    subscription: {
        plan: 'trial',
        status: 'trial', // trial, active, expired, cancelled
        startDate: null,
        renewalDate: null,
        billingPeriod: null,
        users: 1,
        addons: []
    },

    // Bloqueio
    isBlocked: false,
    blockReason: null
};

// ============================================
// 🎯 CRIAR NOVA CONTA (SIGNUP)
// ============================================

function createNewAccount(email, password, name) {
    const now = new Date();
    const trialEnd = new Date(now.getTime() + (7 * 24 * 60 * 60 * 1000)); // +7 dias

    userAccount = {
        id: Date.now(),
        email: email,
        name: name,
        createdAt: now.toISOString(),

        // ✅ TRIAL AUTOMÁTICO DE 7 DIAS
        hasUsedTrial: true, // Marca que JÁ usou o trial
        trialStartDate: now.toISOString(),
        trialEndDate: trialEnd.toISOString(),
        trialDaysTotal: 7,

        subscription: {
            plan: 'trial',
            status: 'trial',
            startDate: now.toISOString(),
            renewalDate: null,
            billingPeriod: null,
            users: 1,
            addons: [],
            features: {
                // Limites do Trial (igual ao Starter)
                serviceOrders: 50,
                clients: 100,
                storage: 1024,
                api: false,
                whiteLabel: false
            }
        },

        isBlocked: false,
        blockReason: null
    };

    // Salvar no localStorage
    localStorage.setItem('userAccount', JSON.stringify(userAccount));
    localStorage.setItem('loggedIn', 'true');

    // Mostrar mensagem de boas-vindas
    showTrialWelcomeMessage(7);

    return userAccount;
}

// ============================================
// 🎉 MENSAGEM DE BOAS-VINDAS DO TRIAL
// ============================================

function showTrialWelcomeMessage(days) {
    const welcomeHTML = `
        <div class="trial-welcome-modal">
            <div class="modal-content clay-card">
                <div class="welcome-icon">🎉</div>
                <h2>Bem-vindo ao TechAssist!</h2>
                <p class="big-text">Você ganhou <strong>${days} dias grátis</strong> para testar todas as funcionalidades!</p>
                
                <div class="trial-benefits">
                    <h3>O que você pode fazer:</h3>
                    <ul>
                        <li>✅ Criar até 50 OS por mês</li>
                        <li>✅ Cadastrar até 100 clientes</li>
                        <li>✅ Gerenciar vendas e estoque</li>
                        <li>✅ Emitir recibos e relatórios</li>
                    </ul>
                </div>
                
                <p class="trial-expiry">
                    Seu trial expira em: <strong>${new Date(userAccount.trialEndDate).toLocaleDateString('pt-BR')}</strong>
                </p>
                
                <button class="primary-btn large" onclick="closeWelcomeModal()">
                    Começar Agora! 🚀
                </button>
            </div>
        </div>
    `;

    // Exibir modal (você pode criar um elemento real no DOM)
    console.log('🎉 Trial de 7 dias ativado!');
    showToast('Conta Criada! 🎉', `Você tem ${days} dias de trial grátis!`);
}

// ============================================
// ⏰ VERIFICAR STATUS DO TRIAL (A CADA LOGIN)
// ============================================

function checkTrialStatus() {
    const now = new Date();
    const trialEnd = new Date(userAccount.trialEndDate);
    const daysLeft = Math.ceil((trialEnd - now) / (1000 * 60 * 60 * 24));

    // Trial ainda ativo
    if (userAccount.subscription.status === 'trial' && daysLeft > 0) {
        console.log(`⏰ Trial ativo: ${daysLeft} dia(s) restante(s)`);

        // Avisos nos últimos 3 dias
        if (daysLeft <= 3) {
            showTrialExpiringWarning(daysLeft);
        }

        return { active: true, daysLeft };
    }

    // Trial EXPIRADO
    if (userAccount.subscription.status === 'trial' && daysLeft <= 0) {
        console.log('❌ Trial EXPIRADO!');
        expireTrial();
        return { active: false, daysLeft: 0 };
    }

    return { active: true, daysLeft: null };
}

// ============================================
// 🚫 EXPIRAR TRIAL E BLOQUEAR CONTA
// ============================================

function expireTrial() {
    userAccount.subscription.status = 'expired';
    userAccount.isBlocked = true;
    userAccount.blockReason = 'trial_expired';

    localStorage.setItem('userAccount', JSON.stringify(userAccount));

    // Mostrar modal de bloqueio FORÇADO
    showMandatoryUpgradeModal();
}

// ============================================
// 🔒 MODAL DE UPGRADE OBRIGATÓRIO
// ============================================

function showMandatoryUpgradeModal() {
    const modal = document.createElement('div');
    modal.id = 'mandatory-upgrade-modal';
    modal.className = 'modal-overlay mandatory';
    modal.innerHTML = `
        <div class="modal-content clay-card forced-modal">
            <div class="icon-warning">⏰</div>
            <h2>Seu Trial Expirou</h2>
            <p class="big-text">Seu período de teste de 7 dias chegou ao fim.</p>
            <p>Para continuar usando o TechAssist, escolha um plano:</p>
            
            <div class="quick-plans">
                <div class="quick-plan-card" onclick="selectPlanFromBlocked('starter')">
                    <div class="plan-icon-small">🚀</div>
                    <h4>Starter</h4>
                    <p class="price">R$ 29,90/mês</p>
                    <small>(anual)</small>
                </div>
                <div class="quick-plan-card recommended" onclick="selectPlanFromBlocked('professional')">
                    <div class="badge-top">⭐ Popular</div>
                    <div class="plan-icon-small">💼</div>
                    <h4>Professional</h4>
                    <p class="price">R$ 59,90/mês</p>
                    <small>(anual)</small>
                </div>
                <div class="quick-plan-card" onclick="selectPlanFromBlocked('business')">
                    <div class="plan-icon-small">🏢</div>
                    <h4>Business</h4>
                    <p class="price">R$ 119,90/mês</p>
                    <small>(anual)</small>
                </div>
            </div>
            
            <button class="primary-btn large full-width" onclick="navigateTo('pricing')">
                Ver Todos os Planos
            </button>
            
            <p class="logout-option">
                Não quer assinar agora? 
                <a href="#" onclick="logoutAndBlock()">Fazer logout</a>
            </p>
        </div>
    `;

    // Adicionar ao body e BLOQUEAR INTERAÇÃO
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden'; // Bloquear scroll

    // Bloquear fechamento do modal (sem X)
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            e.preventDefault();
            e.stopPropagation();
            showToast('Atenção', 'Você precisa escolher um plano para continuar');
        }
    });
}

// ============================================
// ⚠️ AVISO DE TRIAL EXPIRANDO
// ============================================

function showTrialExpiringWarning(daysLeft) {
    // Banner no topo da aplicação
    const existingBanner = document.getElementById('trial-warning-banner');
    if (existingBanner) existingBanner.remove();

    const banner = document.createElement('div');
    banner.id = 'trial-warning-banner';
    banner.className = 'trial-warning-banner';
    banner.innerHTML = `
        <div class="banner-content">
            <span class="icon">⏰</span>
            <span class="text">
                Seu trial expira em <strong>${daysLeft} dia(s)</strong>! 
                <a href="#" onclick="navigateTo('pricing')">Escolha um plano agora</a>
            </span>
            <button onclick="closeBanner()" class="close-banner">×</button>
        </div>
    `;

    document.getElementById('app-main').prepend(banner);
}

// ============================================
// 💳 ATIVAR PLANO PAGO (APÓS TRIAL)
// ============================================

function selectPlanFromBlocked(planName) {
    // Remover bloqueio
    userAccount.isBlocked = false;
    userAccount.blockReason = null;

    const plan = pricingPlans[planName];
    const now = new Date();

    userAccount.subscription = {
        plan: planName,
        status: 'active',
        startDate: now.toISOString(),
        renewalDate: new Date(now.getTime() + 365 * 24 * 60 * 60 * 1000).toISOString(), // +1 ano
        billingPeriod: 'annual',
        users: plan.limits.users,
        addons: []
    };

    localStorage.setItem('userAccount', JSON.stringify(userAccount));

    // Remover modal obrigatório
    const modal = document.getElementById('mandatory-upgrade-modal');
    if (modal) modal.remove();
    document.body.style.overflow = ''; // Restaurar scroll

    // Redirecionar para checkout (ou confirmar)
    showCheckoutModal(planName, 'annual');
}

// ============================================
// 🚪 LOGOUT E BLOQUEIO
// ============================================

function logoutAndBlock() {
    localStorage.setItem('loggedIn', 'false');
    location.reload();
}

// ============================================
// 🔍 VERIFICAR BLOQUEIO AO FAZER QUALQUER AÇÃO
// ============================================

function checkIfBlocked() {
    if (userAccount.isBlocked) {
        showMandatoryUpgradeModal();
        return true;
    }
    return false;
}

// ============================================
// 🎯 IMPEDIR NOVO TRIAL
// ============================================

function canStartTrial() {
    // Verifica se JÁ usou o trial
    if (userAccount.hasUsedTrial) {
        showToast('Trial Indisponível', 'Você já utilizou seu período de teste gratuito.');
        return false;
    }
    return true;
}

// ============================================
// 📊 CONTADOR DE TRIAL NO DASHBOARD
// ============================================

function displayTrialCountdown() {
    if (userAccount.subscription.status !== 'trial') return;

    const now = new Date();
    const trialEnd = new Date(userAccount.trialEndDate);
    const daysLeft = Math.ceil((trialEnd - now) / (1000 * 60 * 60 * 24));
    const hoursLeft = Math.ceil((trialEnd - now) / (1000 * 60 * 60)) % 24;

    const countdownEl = document.getElementById('trial-countdown');
    if (countdownEl) {
        countdownEl.innerHTML = `
            <div class="trial-countdown-widget">
                <div class="countdown-icon">⏰</div>
                <div class="countdown-text">
                    <strong>Trial:</strong> ${daysLeft} dia(s) e ${hoursLeft}h restantes
                </div>
                <button onclick="navigateTo('pricing')" class="upgrade-btn-small">
                    Fazer Upgrade
                </button>
            </div>
        `;
    }
}

// ============================================
// 🔄 INICIALIZAÇÃO NO LOGIN
// ============================================

function initializeAccountSystem() {
    // Carregar conta do localStorage
    const savedAccount = localStorage.getItem('userAccount');
    if (savedAccount) {
        userAccount = JSON.parse(savedAccount);
    }

    // Verificar status do trial
    const trialStatus = checkTrialStatus();

    // Se bloqueado, mostrar modal obrigatório
    if (userAccount.isBlocked && userAccount.blockReason === 'trial_expired') {
        showMandatoryUpgradeModal();
    }

    // Atualizar contador se em trial
    if (userAccount.subscription.status === 'trial' && trialStatus.active) {
        displayTrialCountdown();

        // Atualizar a cada minuto
        setInterval(displayTrialCountdown, 60000);
    }

    console.log('💎 Sistema de Trial Inicializado');
    console.log(`   Status: ${userAccount.subscription.status}`);
    console.log(`   Trial usado: ${userAccount.hasUsedTrial ? 'Sim' : 'Não'}`);
    console.log(`   Bloqueado: ${userAccount.isBlocked ? 'Sim' : 'Não'}`);
}

// ============================================
// 🌐 EXPORTAR FUNÇÕES
// ============================================

window.userAccount = userAccount;
window.createNewAccount = createNewAccount;
window.checkTrialStatus = checkTrialStatus;
window.checkIfBlocked = checkIfBlocked;
window.selectPlanFromBlocked = selectPlanFromBlocked;
window.logoutAndBlock = logoutAndBlock;
window.canStartTrial = canStartTrial;
window.initializeAccountSystem = initializeAccountSystem;

// ============================================
// 🚀 AUTO-INIT
// ============================================

document.addEventListener('DOMContentLoaded', function () {
    initializeAccountSystem();
});
