# 💎 SISTEMA DE PLANOS E ASSINATURAS - TechAssist SaaS

## 📊 **ESTRUTURA DE PRICING**

### **🎯 Planos Base**

```javascript
const pricingPlans = {
    starter: {
        name: "Starter",
        description: "Ideal para pequenos negócios começando",
        icon: "🚀",
        features: {
            users: 1,
            serviceOrders: 50,
            clients: 100,
            storage: "1GB",
            support: "Email",
            backupDays: 7,
            reports: "básicos",
            api: false,
            whiteLabel: false,
            priority: "normal"
        },
        prices: {
            monthly: 49.90,
            quarterly: 39.90,    // 20% off
            semiannual: 34.90,   // 30% off
            annual: 29.90        // 40% off
        },
        addons: {
            extraUser: 15.00,
            extraStorage: 10.00,
            prioritySupport: 29.90
        }
    },
    
    professional: {
        name: "Professional",
        description: "Para empresas em crescimento",
        icon: "💼",
        popular: true,
        features: {
            users: 3,
            serviceOrders: 200,
            clients: 500,
            storage: "5GB",
            support: "Email + Chat",
            backupDays: 30,
            reports: "avançados",
            api: true,
            whiteLabel: false,
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
            prioritySupport: 19.90,
            aiFeatures: 39.90
        }
    },
    
    business: {
        name: "Business",
        description: "Para empresas estabelecidas",
        icon: "🏢",
        features: {
            users: 10,
            serviceOrders: 1000,
            clients: 2000,
            storage: "20GB",
            support: "Email + Chat + Telefone",
            backupDays: 90,
            reports: "completos + BI",
            api: true,
            whiteLabel: true,
            priority: "vip"
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
            prioritySupport: "incluído",
            aiFeatures: 29.90,
            customIntegration: 99.90
        }
    },
    
    enterprise: {
        name: "Enterprise",
        description: "Solução completa e personalizada",
        icon: "👑",
        features: {
            users: "ilimitado",
            serviceOrders: "ilimitado",
            clients: "ilimitado",
            storage: "ilimitado",
            support: "24/7 Dedicado",
            backupDays: 365,
            reports: "customizados",
            api: true,
            whiteLabel: true,
            priority: "platinum",
            dedicatedServer: true,
            sla: "99.9%",
            customFeatures: true
        },
        prices: {
            monthly: "Sob consulta",
            quarterly: "Sob consulta",
            semiannual: "Sob consulta",
            annual: "Sob consulta"
        },
        contact: true
    }
};
```

---

## 🎨 **PÁGINA DE PRICING (HTML)**

```html
<!-- PRICING PAGE -->
<section id="view-pricing" class="view-section hidden">
    <div class="pricing-header">
        <h1>Escolha o Plano Perfeito para Você</h1>
        <p class="subtitle">Sem surpresas. Cancele quando quiser. 30 dias de garantia.</p>
        
        <!-- Toggle de período -->
        <div class="billing-toggle">
            <span class="toggle-label">Mensal</span>
            <label class="switch">
                <input type="checkbox" id="billing-period">
                <span class="slider round"></span>
            </label>
            <span class="toggle-label">Anual <span class="badge">-40%</span></span>
        </div>
    </div>

    <div class="pricing-grid">
        <!-- STARTER PLAN -->
        <div class="pricing-card clay-card">
            <div class="plan-icon">🚀</div>
            <h3>Starter</h3>
            <p class="plan-description">Ideal para pequenos negócios começando</p>
            
            <div class="plan-price">
                <span class="currency">R$</span>
                <span class="amount" data-monthly="49.90" data-annual="29.90">49,90</span>
                <span class="period">/mês</span>
            </div>
            
            <ul class="plan-features">
                <li>✅ 1 usuário</li>
                <li>✅ Até 50 OS/mês</li>
                <li>✅ 100 clientes</li>
                <li>✅ 1GB armazenamento</li>
                <li>✅ Suporte por email</li>
                <li>✅ Backup 7 dias</li>
                <li>✅ Relatórios básicos</li>
                <li>❌ Acesso à API</li>
                <li>❌ White Label</li>
            </ul>
            
            <button class="primary-btn full-width">Começar Grátis</button>
            <p class="trial-info">30 dias grátis • Sem cartão</p>
            
            <!-- ADD-ONS -->
            <div class="addons-section">
                <h4>Adicione Extras:</h4>
                <label class="addon-item">
                    <input type="checkbox" data-price="15.00">
                    <span>+1 Usuário (+R$ 15/mês)</span>
                </label>
                <label class="addon-item">
                    <input type="checkbox" data-price="10.00">
                    <span>+1GB Storage (+R$ 10/mês)</span>
                </label>
            </div>
        </div>

        <!-- PROFESSIONAL PLAN (POPULAR) -->
        <div class="pricing-card clay-card popular">
            <div class="popular-badge">🌟 Mais Popular</div>
            <div class="plan-icon">💼</div>
            <h3>Professional</h3>
            <p class="plan-description">Para empresas em crescimento</p>
            
            <div class="plan-price">
                <span class="currency">R$</span>
                <span class="amount" data-monthly="99.90" data-annual="59.90">99,90</span>
                <span class="period">/mês</span>
            </div>
            
            <ul class="plan-features">
                <li>✅ 3 usuários</li>
                <li>✅ Até 200 OS/mês</li>
                <li>✅ 500 clientes</li>
                <li>✅ 5GB armazenamento</li>
                <li>✅ Suporte email + chat</li>
                <li>✅ Backup 30 dias</li>
                <li>✅ Relatórios avançados</li>
                <li>✅ Acesso à API</li>
                <li>❌ White Label</li>
            </ul>
            
            <button class="primary-btn full-width featured">Começar Grátis</button>
            <p class="trial-info">30 dias grátis • Sem cartão</p>
            
            <div class="addons-section">
                <h4>Adicione Extras:</h4>
                <label class="addon-item">
                    <input type="checkbox" data-price="12.00">
                    <span>+1 Usuário (+R$ 12/mês)</span>
                </label>
                <label class="addon-item">
                    <input type="checkbox" data-price="39.90">
                    <span>IA Preditiva (+R$ 39,90/mês)</span>
                </label>
            </div>
        </div>

        <!-- BUSINESS PLAN -->
        <div class="pricing-card clay-card">
            <div class="plan-icon">🏢</div>
            <h3>Business</h3>
            <p class="plan-description">Para empresas estabelecidas</p>
            
            <div class="plan-price">
                <span class="currency">R$</span>
                <span class="amount" data-monthly="199.90" data-annual="119.90">199,90</span>
                <span class="period">/mês</span>
            </div>
            
            <ul class="plan-features">
                <li>✅ 10 usuários</li>
                <li>✅ Até 1000 OS/mês</li>
                <li>✅ 2000 clientes</li>
                <li>✅ 20GB armazenamento</li>
                <li>✅ Suporte 24/7</li>
                <li>✅ Backup 90 dias</li>
                <li>✅ BI + Dashboards</li>
                <li>✅ Acesso à API</li>
                <li>✅ White Label</li>
            </ul>
            
            <button class="primary-btn full-width">Começar Grátis</button>
            <p class="trial-info">30 dias grátis • Sem cartão</p>
        </div>

        <!-- ENTERPRISE PLAN -->
        <div class="pricing-card clay-card enterprise">
            <div class="plan-icon">👑</div>
            <h3>Enterprise</h3>
            <p class="plan-description">Solução completa e personalizada</p>
            
            <div class="plan-price">
                <span class="currency"></span>
                <span class="amount">Customizado</span>
                <span class="period"></span>
            </div>
            
            <ul class="plan-features">
                <li>✅ Usuários ilimitados</li>
                <li>✅ OS ilimitadas</li>
                <li>✅ Clientes ilimitados</li>
                <li>✅ Storage ilimitado</li>
                <li>✅ Suporte dedicado</li>
                <li>✅ Backup infinito</li>
                <li>✅ Features customizadas</li>
                <li>✅ SLA 99.9%</li>
                <li>✅ Servidor dedicado</li>
            </ul>
            
            <button class="primary-btn full-width gold">Falar com Vendas</button>
            <p class="trial-info">Consultoria gratuita</p>
        </div>
    </div>

    <!-- COMPARISON TABLE -->
    <div class="comparison-section">
        <h2>Comparação Detalhada</h2>
        <div class="comparison-table clay-card">
            <table class="clay-table">
                <thead>
                    <tr>
                        <th>Recursos</th>
                        <th>Starter</th>
                        <th>Professional</th>
                        <th>Business</th>
                        <th>Enterprise</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Usuários</td>
                        <td>1</td>
                        <td>3</td>
                        <td>10</td>
                        <td>∞</td>
                    </tr>
                    <tr>
                        <td>Ordens de Serviço/mês</td>
                        <td>50</td>
                        <td>200</td>
                        <td>1.000</td>
                        <td>∞</td>
                    </tr>
                    <tr>
                        <td>API Access</td>
                        <td>❌</td>
                        <td>✅</td>
                        <td>✅</td>
                        <td>✅</td>
                    </tr>
                    <tr>
                        <td>White Label</td>
                        <td>❌</td>
                        <td>❌</td>
                        <td>✅</td>
                        <td>✅</td>
                    </tr>
                    <tr>
                        <td>IA Preditiva</td>
                        <td>❌</td>
                        <td>Add-on</td>
                        <td>✅</td>
                        <td>✅</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>

    <!-- FAQ -->
    <div class="pricing-faq">
        <h2>Perguntas Frequentes</h2>
        <div class="faq-grid">
            <div class="faq-item clay-card">
                <h4>🔄 Posso mudar de plano?</h4>
                <p>Sim! Você pode fazer upgrade ou downgrade a qualquer momento.</p>
            </div>
            <div class="faq-item clay-card">
                <h4>💳 Quais formas de pagamento?</h4>
                <p>Cartão de crédito, PIX, Boleto e transferência bancária.</p>
            </div>
            <div class="faq-item clay-card">
                <h4>🔒 Meus dados estão seguros?</h4>
                <p>100%! Criptografia de ponta a ponta e backups automáticos.</p>
            </div>
            <div class="faq-item clay-card">
                <h4>📊 Posso exportar meus dados?</h4>
                <p>Sim, você pode exportar todos os seus dados a qualquer momento.</p>
            </div>
        </div>
    </div>
</section>
```

---

## 🎨 **CSS PARA PRICING**

```css
/* Pricing Header */
.pricing-header {
    text-align: center;
    margin-bottom: 60px;
}

.pricing-header h1 {
    font-size: 2.5em;
    margin-bottom: 15px;
}

.pricing-header .subtitle {
    font-size: 1.2em;
    color: var(--text-secondary);
    margin-bottom: 30px;
}

/* Billing Toggle */
.billing-toggle {
    display: inline-flex;
    align-items: center;
    gap: 15px;
    padding: 10px 20px;
    background: var(--bg-secondary);
    border-radius: 50px;
}

.toggle-label {
    font-weight: 600;
}

.badge {
    background: var(--success);
    color: white;
    padding: 2px 8px;
    border-radius: 12px;
    font-size: 0.8em;
    font-weight: 600;
}

/* Pricing Grid */
.pricing-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 30px;
    margin-bottom: 60px;
}

/* Pricing Card */
.pricing-card {
    position: relative;
    padding: 30px;
    text-align: center;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.pricing-card:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(0,0,0,0.15);
}

.pricing-card.popular {
    border: 3px solid var(--primary);
    transform: scale(1.05);
}

.popular-badge {
    position: absolute;
    top: -15px;
    left: 50%;
    transform: translateX(-50%);
    background: linear-gradient(135deg, var(--primary), var(--success));
    color: white;
    padding: 5px 20px;
    border-radius: 20px;
    font-weight: 600;
    font-size: 0.9em;
}

.plan-icon {
    font-size: 3em;
    margin-bottom: 15px;
}

.plan-description {
    color: var(--text-secondary);
    margin-bottom: 20px;
    min-height: 40px;
}

/* Plan Price */
.plan-price {
    margin: 30px 0;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    gap: 5px;
}

.plan-price .currency {
    font-size: 1.5em;
    font-weight: 600;
    margin-bottom: 10px;
}

.plan-price .amount {
    font-size: 3.5em;
    font-weight: 800;
    line-height: 1;
    background: linear-gradient(135deg, var(--primary), var(--success));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

.plan-price .period {
    font-size: 1.2em;
    color: var(--text-secondary);
    margin-bottom: 10px;
}

/* Plan Features */
.plan-features {
    list-style: none;
    padding: 0;
    margin: 30px 0;
    text-align: left;
}

.plan-features li {
    padding: 10px 0;
    border-bottom: 1px solid var(--border-color);
}

.trial-info {
    margin-top: 10px;
    font-size: 0.9em;
    color: var(--text-secondary);
}

/* Add-ons */
.addons-section {
    margin-top: 30px;
    padding-top: 20px;
    border-top: 2px dashed var(--border-color);
    text-align: left;
}

.addons-section h4 {
    margin-bottom: 15px;
    color: var(--primary);
}

.addon-item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px;
    cursor: pointer;
    transition: background 0.2s;
    border-radius: 8px;
}

.addon-item:hover {
    background: var(--bg-secondary);
}

/* Comparison Table */
.comparison-section {
    margin: 60px 0;
}

.comparison-section h2 {
    text-align: center;
    margin-bottom: 30px;
}

.comparison-table {
    overflow-x: auto;
}

/* FAQ */
.pricing-faq {
    margin-top: 60px;
}

.pricing-faq h2 {
    text-align: center;
    margin-bottom: 40px;
}

.faq-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
}

.faq-item {
    padding: 25px;
}

.faq-item h4 {
    margin-bottom: 10px;
    color: var(--primary);
}
```

---

## ⚙️ **JAVASCRIPT - Gestão de Planos**

```javascript
// Estado do plano do usuário
let currentSubscription = {
    plan: 'starter',
    billingPeriod: 'monthly',
    users: 1,
    addons: [],
    startDate: new Date().toISOString(),
    renewalDate: null
};

// Toggle de período de cobrança
document.getElementById('billing-period').addEventListener('change', function() {
    const isAnnual = this.checked;
    const period = isAnnual ? 'annual' : 'monthly';
    
    document.querySelectorAll('.plan-price .amount').forEach(el => {
        const monthlyPrice = el.dataset.monthly;
        const annualPrice = el.dataset.annual;
        el.textContent = (isAnnual ? annualPrice : monthlyPrice).replace('.', ',');
    });
});

// Verificar limites do plano
function checkPlanLimits(action) {
    const plan = pricingPlans[currentSubscription.plan];
    
    switch(action) {
        case 'addServiceOrder':
            return serviceOrders.length < plan.features.serviceOrders;
        case 'addClient':
            return clients.length < plan.features.clients;
        case 'addUser':
            return getCurrentUserCount() < plan.features.users;
        case 'useAPI':
            return plan.features.api;
        default:
            return true;
    }
}

// Upgrade de plano
function upgradePlan(newPlan) {
    const oldPlan = currentSubscription.plan;
    currentSubscription.plan = newPlan;
    currentSubscription.upgradeDate = new Date().toISOString();
    
    saveData();
    showToast('Plano Atualizado!', `Você agora está no plano ${pricingPlans[newPlan].name}`);
    
    // Desbloquear features
    unlockFeatures(newPlan);
}

// Calcular total com add-ons
function calculateTotal(plan, period, addons = []) {
    let total = pricingPlans[plan].prices[period];
    
    addons.forEach(addon => {
        total += pricingPlans[plan].addons[addon];
    });
    
    return total;
}
```

---

## 📊 **IMPLEMENTAÇÃO PRONTA!**

Criei a estrutura completa de:
- ✅ 4 Planos (Starter, Professional, Business, Enterprise)
- ✅ Pricing para 4 períodos (1m, 3m, 6m, 1a)
- ✅ Sistema de Add-ons por plano
- ✅ Gestão de funcionários/usuários
- ✅ Controle de limites
- ✅ Página visual completa
- ✅ FAQ e comparativo

## 🎯 **Quer que eu:**
1. Adicione isso ao HTML principal?
2. Implemente a lógica de pagamento?
3. Crie o painel de Admin para gerenciar assinaturas?

**Diga "implementar agora" e eu adiciono tudo!** 🚀
