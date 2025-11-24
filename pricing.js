// ============================================
// 💎 SISTEMA DE PLANOS E ASSINATURAS
// ============================================

// Definição dos Planos
const pricingPlans = {
    starter: {
        name: "Starter",
        description: "Ideal para pequenos negócios",
        icon: "🚀",
        limits: {
            users: 1,
            maxUsers: 3, // com add-ons
            serviceOrders: 50,
            clients: 100,
            storage: 1024, // MB
            backupDays: 7
        },
        features: {
            api: false,
            whiteLabel: false,
            reports: "básicos",
            support: "email",
            priority: "normal"
        },
        prices: {
            monthly: 49.90,
            quarterly: 39.90,
            semiannual: 34.90,
            annual: 29.90
        },
        addons: {
            extraUser: 15.00,
            extraStorage: 10.00
        }
    },

    professional: {
        name: "Professional",
        description: "Para empresas em crescimento",
        icon: "💼",
        popular: true,
        limits: {
            users: 3,
            maxUsers: 999, // praticamente ilimitado
            serviceOrders: 200,
            clients: 500,
            storage: 5120, // MB
            backupDays: 30
        },
        features: {
            api: true,
            whiteLabel: false,
            reports: "avançados",
            support: "email+chat",
            priority: "high"
        },
        prices: {
            monthly: 99.90,
            quarterly: 79.90,
            semiannual: 69.90,
            annual: 59.90
        },
        addons: {
            extraUser: 12.00,
            extraStorage: 8.00,
            aiFeatures: 39.90
        }
    },

    business: {
        name: "Business",
        description: "Para empresas estabelecidas",
        icon: "🏢",
        limits: {
            users: 10,
            maxUsers: 999,
            serviceOrders: 1000,
            clients: 2000,
            storage: 20480, // MB
            backupDays: 90
        },
        features: {
            api: true,
            whiteLabel: true,
            reports: "completos+BI",
            support: "24/7",
            priority: "vip",
            aiFeatures: true
        },
        prices: {
            monthly: 199.90,
            quarterly: 159.90,
            semiannual: 139.90,
            annual: 119.90
        },
        addons: {
            extraUser: 10.00,
            extraStorage: 5.00,
            customIntegration: 99.90
        }
    },

    enterprise: {
        name: "Enterprise",
        description: "Solução customizada",
        icon: "👑",
        limits: {
            users: 9999,
            maxUsers: 9999,
            serviceOrders: 99999,
            clients: 99999,
            storage: 999999, // MB
            backupDays: 365
        },
        features: {
            api: true,
            whiteLabel: true,
            reports: "customizados",
            support: "dedicado",
            priority: "platinum",
            aiFeatures: true,
            dedicatedServer: true,
            sla: "99.9%"
        },
        prices: {
            monthly: 'consulta',
            quarterly: 'consulta',
            semiannual: 'consulta',
            annual: 'consulta'
        },
        contact: true
    }
};

// Estado da Assinatura do Usuário
let currentSubscription = {
    plan: 'starter',
    billingPeriod: 'monthly',
    users: 1,
    addons: [],
    startDate: new Date().toISOString(),
    trialEndsAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    isActive: true,
    isTrial: true
};

// Usuários/Funcionários do Sistema
let systemUsers = [
    {
        id: 1,
        name: "Administrador",
        email: "admin@techassist.com",
        role: "admin",
        permissions: "all",
        createdAt: new Date().toISOString()
    }
];

// ===== FUNÇÕES DE CONTROLE DE PLANOS =====

// Verificar limites do plano atual
function checkPlanLimit(action) {
    const plan = pricingPlans[currentSubscription.plan];

    switch (action) {
        case 'addServiceOrder':
            const currentMonth = new Date().getMonth();
            const ordersThisMonth = serviceOrders.filter(o => {
                const orderMonth = new Date(o.createdAt).getMonth();
                return orderMonth === currentMonth;
            }).length;

            if (ordersThisMonth >= plan.limits.serviceOrders) {
                showUpgradeModal('serviceOrders', ordersThisMonth, plan.limits.serviceOrders);
                return false;
            }
            return true;

        case 'addClient':
            if (clients.length >= plan.limits.clients) {
                showUpgradeModal('clients', clients.length, plan.limits.clients);
                return false;
            }
            return true;

        case 'addUser':
            if (systemUsers.length >= plan.limits.users + currentSubscription.addons.filter(a => a === 'extraUser').length) {
                showUpgradeModal('users', systemUsers.length, plan.limits.users);
                return false;
            }
            return true;

        case 'useAPI':
            if (!plan.features.api) {
                showFeatureLockedModal('API Access');
                return false;
            }
            return true;

        case 'useWhiteLabel':
            if (!plan.features.whiteLabel) {
                showFeatureLockedModal('White Label');
                return false;
            }
            return true;

        default:
            return true;
    }
}

// Modal de Upgrade
function showUpgradeModal(resource, current, limit) {
    const messages = {
        serviceOrders: `Você atingiu o limite de ${limit} OS/mês do plano ${pricingPlans[currentSubscription.plan].name}. Atualmente você tem ${current} ordens.`,
        clients: `Você atingiu o limite de ${limit} clientes do plano ${pricingPlans[currentSubscription.plan].name}.`,
        users: `Você atingiu o limite de ${limit} usuários do plano ${pricingPlans[currentSubscription.plan].name}.`
    };

    const modal = confirm(`${messages[resource]}\n\nDeseja fazer upgrade do seu plano?`);

    if (modal) {
        navigateTo('pricing');
    }
}

// Modal de Feature Bloqueada
function showFeatureLockedModal(featureName) {
    const modal = confirm(`${featureName} não está disponível no seu plano atual (${pricingPlans[currentSubscription.plan].name}).\n\nDeseja fazer upgrade?`);

    if (modal) {
        navigateTo('pricing');
    }
}

// ===== SELEÇÃO DE PLANO =====

function selectPlan(planName) {
    if (planName === 'enterprise') {
        contactSales();
        return;
    }

    const plan = pricingPlans[planName];
    const period = document.getElementById('billing-period-toggle')?.checked ? 'annual' : 'monthly';

    // Mostrar modal de checkout (simplificado)
    const price = plan.prices[period];
    const periodText = {
        monthly: 'mensal',
        quarterly: 'trimestral (3 meses)',
        semiannual: 'semestral (6 meses)',
        annual: 'anual (12 meses)'
    }[period];

    const confirm = window.confirm(`Iniciar teste grátis de 30 dias do plano ${plan.name}?\n\nApós o período de teste: R$ ${price}/mês (cobrança ${periodText})\n\nVocê pode cancelar a qualquer momento.`);

    if (confirm) {
        activatePlan(planName, period);
    }
}

function activatePlan(planName, period) {
    currentSubscription = {
        plan: planName,
        billingPeriod: period,
        users: pricingPlans[planName].limits.users,
        addons: [],
        startDate: new Date().toISOString(),
        trialEndsAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        isActive: true,
        isTrial: true
    };

    saveData();
    showToast('Plano Ativado! 🎉', `Bem-vindo ao ${pricingPlans[planName].name}! Você tem 30 dias de teste grátis.`);

    // Atualizar UI
    updateSubscriptionUI();
}

// ===== UPGRADE/DOWNGRADE =====

function upgradePlan(newPlan) {
    if (newPlan === currentSubscription.plan) {
        showToast('Aviso', 'Você já está neste plano!');
        return;
    }

    const oldPlan = pricingPlans[currentSubscription.plan];
    const newPlanData = pricingPlans[newPlan];

    currentSubscription.plan = newPlan;
    currentSubscription.users = newPlanData.limits.users;
    currentSubscription.upgradeDate = new Date().toISOString();

    saveData();

    showToast('Plano Atualizado! 🚀', `Você agora está no plano ${newPlanData.name} com todos os recursos desbloqueados!`);

    updateSubscriptionUI();
}

// ===== GESTÃO DE USUÁRIOS/FUNCIONÁRIOS =====

function addSystemUser(userData) {
    if (!checkPlanLimit('addUser')) {
        return false;
    }

    const newUser = {
        id: Date.now(),
        name: userData.name,
        email: userData.email,
        role: userData.role || 'user',
        permissions: userData.permissions || 'limited',
        createdAt: new Date().toISOString()
    };

    systemUsers.push(newUser);
    saveData();

    showToast('Usuário Adicionado', `${newUser.name} foi adicionado com sucesso!`);
    return true;
}

function removeSystemUser(userId) {
    if (userId === 1) {
        showToast('Erro', 'Não é possível remover o administrador principal!');
        return;
    }

    systemUsers = systemUsers.filter(u => u.id !== userId);
    saveData();

    showToast('Usuário Removido', 'Usuário removido com sucesso');
}

// ===== GESTÃO DE ADD-ONS =====

function addAddon(addonName) {
    const plan = pricingPlans[currentSubscription.plan];

    if (!plan.addons[addonName]) {
        showToast('Erro', 'Add-on não disponível para este plano');
        return;
    }

    if (currentSubscription.addons.includes(addonName)) {
        showToast('Aviso', 'Você já possui este add-on');
        return;
    }

    // Validar limite de usuários extras (Starter)
    if (addonName === 'extraUser' && currentSubscription.plan === 'starter') {
        const extraUsers = currentSubscription.addons.filter(a => a === 'extraUser').length;
        if (extraUsers >= 2) {
            showToast('Limite Atingido', 'Plano Starter permite no máximo +2 usuários extras. Considere fazer upgrade!');
            return;
        }
    }

    currentSubscription.addons.push(addonName);
    saveData();

    const price = plan.addons[addonName];
    showToast('Add-on Ativado', `${addonName} adicionado por +R$ ${price}/mês`);

    updateSubscriptionUI();
}

function removeAddon(addonName) {
    currentSubscription.addons = currentSubscription.addons.filter(a => a !== addonName);
    saveData();

    showToast('Add-on Removido', `${addonName} foi removido da sua assinatura`);
    updateSubscriptionUI();
}

// ===== BILLING PERIOD TOGGLE =====

function setupBillingToggle() {
    const toggle = document.getElementById('billing-period-toggle');
    if (!toggle) return;

    toggle.addEventListener('change', function () {
        const isAnnual = this.checked;

        document.querySelectorAll('.plan-price .amount').forEach(el => {
            const monthlyPrice = el.dataset.monthly;
            const annualPrice = el.dataset.annual;

            if (monthlyPrice && annualPrice) {
                el.textContent = (isAnnual ? annualPrice : monthlyPrice).replace('.', ',');
            }
        });
    });
}

// ===== CONTACT SALES (ENTERPRISE) =====

function contactSales() {
    const email = 'vendas@techassist.com';
    const subject = 'Interesse no Plano Enterprise';
    const body = 'Olá! Tenho interesse no plano Enterprise e gostaria de mais informações.';

    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    showToast('Email Aberto', 'Entre em contato com nossa equipe de vendas!');
}

// ===== ATUALIZAR UI COM INFO DO PLANO =====

function updateSubscriptionUI() {
    // Atualizar badge do plano no menu
    const planBadge = document.getElementById('current-plan-badge');
    if (planBadge) {
        const plan = pricingPlans[currentSubscription.plan];
        planBadge.textContent = `${plan.icon} ${plan.name}`;
        planBadge.className = `plan-badge plan-${currentSubscription.plan}`;
    }

    // Atualizar contador de recursos
    updateResourceCounters();

    // Mostrar trial banner se aplicável
    if (currentSubscription.isTrial) {
        showTrialBanner();
    }
}

function updateResourceCounters() {
    const plan = pricingPlans[currentSubscription.plan];

    // Exemplo: mostrar uso de OS do mês
    const currentMonth = new Date().getMonth();
    const ordersThisMonth = serviceOrders.filter(o => {
        const orderMonth = new Date(o.createdAt).getMonth();
        return orderMonth === currentMonth;
    }).length;

    console.log(`📊 Uso do Plano ${plan.name}:`);
    console.log(`   - OS este mês: ${ordersThisMonth}/${plan.limits.serviceOrders}`);
    console.log(`   - Clientes: ${clients.length}/${plan.limits.clients}`);
    console.log(`   - Usuários: ${systemUsers.length}/${plan.limits.users}`);
}

function showTrialBanner() {
    const daysLeft = Math.ceil((new Date(currentSubscription.trialEndsAt) - new Date()) / (1000 * 60 * 60 * 24));

    if (daysLeft > 0 && daysLeft <= 30) {
        console.log(`⏰ Período de teste: ${daysLeft} dias restantes`);
        // Aqui você pode criar um banner visual no topo da página
    }
}

// ===== CALCULAR TOTAL COM ADD-ONS =====

function calculateMonthlyTotal() {
    const plan = pricingPlans[currentSubscription.plan];
    let total = plan.prices[currentSubscription.billingPeriod];

    currentSubscription.addons.forEach(addonName => {
        if (plan.addons[addonName]) {
            total += plan.addons[addonName];
        }
    });

    return total;
}

// ===== EXPORTAR FUNÇÕES =====

window.pricingPlans = pricingPlans;
window.currentSubscription = currentSubscription;
window.systemUsers = systemUsers;
window.checkPlanLimit = checkPlanLimit;
window.selectPlan = selectPlan;
window.upgradePlan = upgradePlan;
window.addSystemUser = addSystemUser;
window.removeSystemUser = removeSystemUser;
window.addAddon = addAddon;
window.removeAddon = removeAddon;
window.contactSales = contactSales;
window.setupBillingToggle = setupBillingToggle;
window.calculateMonthlyTotal = calculateMonthlyTotal;

// ===== INICIALIZAÇÃO =====

document.addEventListener('DOMContentLoaded', function () {
    // Carregar assinatura do localStorage
    const savedSubscription = localStorage.getItem('subscription');
    if (savedSubscription) {
        currentSubscription = JSON.parse(savedSubscription);
    }

    const savedUsers = localStorage.getItem('systemUsers');
    if (savedUsers) {
        systemUsers = JSON.parse(savedUsers);
    }

    // Setup toggle
    setupBillingToggle();

    // Atualizar UI
    updateSubscriptionUI();

    console.log('💎 Sistema de Planos Inicializado!');
    console.log(`   Plano Atual: ${pricingPlans[currentSubscription.plan].name}`);
    console.log(`   Total Mensal: R$ ${calculateMonthlyTotal().toFixed(2)}`);
});
