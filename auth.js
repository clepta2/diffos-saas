// ============================================
// 🔐 AUTH SYSTEM - Login & Signup
// ============================================

//Toggle between login and signup
document.getElementById('show-signup')?.addEventListener('click', function (e) {
    e.preventDefault();
    document.getElementById('login-form-container').classList.remove('active');
    document.getElementById('signup-form-container').classList.add('active');
});

document.getElementById('show-login')?.addEventListener('click', function (e) {
    e.preventDefault();
    document.getElementById('signup-form-container').classList.remove('active');
    document.getElementById('login-form-container').classList.add('active');
});

// ===== LOGIN FORM =====
document.getElementById('login-form')?.addEventListener('submit', function (e) {
    e.preventDefault();

    const email = document.getElementById('login-email').value

        ;
    const password = document.getElementById('login-password').value;

    // Validação simples (substituir por validação real no backend)
    if (email && password) {
        // Simular login bem-sucedido
        localStorage.setItem('loggedIn', 'true');
        localStorage.setItem('userEmail', email);

        // Esconder tela de login
        document.getElementById('auth-screen').classList.add('hidden');

        // Mostrar aplicação main
        document.getElementById('app-main').classList.remove('hidden');

        // Inicializar sistema
        if (typeof initializeAccountSystem === 'function') {
            initializeAccountSystem();
        }

        showToast('Login Bem-sucedido! 🎉', `Bem-vindo de volta!`);
    } else {
        showToast('Erro', 'Por favor, preencha todos os campos');
    }
});

// ===== SIGNUP FORM =====
document.getElementById('signup-form')?.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('signup-name').value;
    const company = document.getElementById('signup-company').value;
    const email = document.getElementById('signup-email').value;
    const phone = document.getElementById('signup-phone').value;
    const password = document.getElementById('signup-password').value;
    const passwordConfirm = document.getElementById('signup-password-confirm').value;
    const agreeTerms = document.getElementById('agree-terms').checked;

    // Validações
    if (!name || !email || !password) {
        return showToast('Campos Obrigatórios', 'Preencha nome, email e senha');
    }

    if (password.length < 8) {
        return showToast('Senha Fraca', 'A senha deve ter no mínimo 8 caracteres');
    }

    if (password !== passwordConfirm) {
        return showToast('Senhas Diferentes', 'As senhas não coincidem');
    }

    if (!agreeTerms) {
        return showToast('Termos de Uso', 'Você deve concordar com os termos para continuar');
    }

    // ✅ CRIAR CONTA COM TRIAL DE 7 DIAS
    if (typeof createNewAccount === 'function') {
        createNewAccount(email, password, name);
    } else {
        // Fallback se trial-system.js não estiver carregado
        const now = new Date();
        const trialEnd = new Date(now.getTime() + (7 * 24 * 60 * 60 * 1000));

        const newAccount = {
            id: Date.now(),
            name: name,
            company: company,
            email: email,
            phone: phone,
            createdAt: now.toISOString(),
            hasUsedTrial: true,
            trialStartDate: now.toISOString(),
            trialEndDate: trialEnd.toISOString(),
            subscription: {
                plan: 'trial',
                status: 'trial',
                users: 1
            }
        };

        localStorage.setItem('userAccount', JSON.stringify(newAccount));
        localStorage.setItem('loggedIn', 'true');
        localStorage.setItem('userEmail', email);
    }

    // Esconder tela de cadastro
    document.getElementById('authscreen').classList.add('hidden');

    // Mostrar aplicação
    document.getElementById('app-main').classList.remove('hidden');

    // Mostrar mensagem de boas-vindas com trial
    showTrialWelcomeModal(name);
});

// ===== WELCOME MODAL AFTER SIGNUP =====
function showTrialWelcomeModal(userName) {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.id = 'trial-welcome-overlay';
    modal.innerHTML = `
        <div class="modal-content clay-card" style="max-width: 600px; text-align: center; padding: 50px;">
            <div style="font-size: 5em; margin-bottom: 20px;">🎉</div>
            <h2>Bem-vindo ao TechAssist, ${userName}!</h2>
            <p style="font-size: 1.3em; margin: 20px 0;">
                Sua conta foi criada com sucesso!
            </p>
            
            <div class="trial-info-box" style="margin: 30px 0;">
                <h3 style="color: #667eea; margin-bottom: 20px;">🎁 Você ganhou:</h3>
                <ul style="list-style: none; padding: 0; font-size: 1.1em;">
                    <li style="padding: 10px 0;">✅ <strong>7 dias de trial grátis</strong></li>
                    <li style="padding: 10px 0;">✅ Acesso a todos os recursos</li>
                    <li style="padding: 10px 0;">✅ Até 50 OS por mês</li>
                    <li style="padding: 10px 0;">✅ 100 clientes cadastrados</li>
                    <li style="padding: 10px 0;">✅ Sem cartão de crédito</li>
                </ul>
            </div>
            
            <p style="color: var(--text-secondary); margin: 20px 0;">
                Seu trial expira em: <strong style="color: #ff6b6b;">${new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString('pt-BR')}</strong>
            </p>
            
            <button class="primary-btn large gradient" onclick="closeTrialWelcome()" style="margin-top: 20px;">
                🚀 Começar Agora!
            </button>
        </div>
    `;

    document.body.appendChild(modal);
}

function closeTrialWelcome() {
    const modal = document.getElementById('trial-welcome-overlay');
    if (modal) {
        modal.remove();
    }

    // Inicializar tour guiado (opcional)
    if (typeof startOnboardingTour === 'function') {
        startOnboardingTour();
    }
}

// ===== SOCIAL LOGIN (Placeholder) =====
document.querySelectorAll('.social-btn').forEach(btn => {
    btn.addEventListener('click', function () {
        const provider = this.classList.contains('google') ? 'Google' : 'Microsoft';
        showToast('Em Breve', `Login com ${provider} será implementado em breve!`);
    });
});

// ===== MÁSCARAS DE INPUT =====
const phoneInput = document.getElementById('signup-phone');
if (phoneInput) {
    phoneInput.addEventListener('input', function (e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 0) {
            value = value.replace(/^(\d{2})(\d{5})(\d{4}).*/, '($1) $2-$3');
        }
        e.target.value = value;
    });
}

// ===== VALIDAÇÃO DE SENHA EM TEMPO REAL =====
const passwordInput = document.getElementById('signup-password');
const passwordConfirmInput = document.getElementById('signup-password-confirm');

if (passwordConfirmInput) {
    passwordConfirmInput.addEventListener('input', function () {
        const password = passwordInput.value;
        const confirm = this.value;

        if (confirm.length > 0) {
            if (password === confirm) {
                this.style.borderColor = 'var(--success)';
            } else {
                this.style.borderColor = 'var(--danger)';
            }
        } else {
            this.style.borderColor = '';
        }
    });
}

// ===== FORÇA DA SENHA =====
if (passwordInput) {
    passwordInput.addEventListener('input', function () {
        const password = this.value;
        let strength = 0;

        if (password.length >= 8) strength++;
        if (password.length >= 12) strength++;
        if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
        if (/[0-9]/.test(password)) strength++;
        if (/[^a-zA-Z0-9]/.test(password)) strength++;

        // Visual feedback (você pode adicionar um indicador visual)
        if (strength >= 4) {
            this.style.borderColor = 'var(--success)';
        } else if (strength >= 2) {
            this.style.borderColor = 'var(--warning)';
        } else {
            this.style.borderColor = 'var(--danger)';
        }
    });
}

// ===== AUTO-LOGIN NA INICIALIZAÇÃO =====
window.addEventListener('DOMContentLoaded', function () {
    const isLoggedIn = localStorage.getItem('loggedIn') === 'true';

    if (isLoggedIn) {
        // Usuário já está logado
        document.getElementById('auth-screen')?.classList.add('hidden');
        document.getElementById('app-main')?.classList.remove('hidden');

        // Inicializar sistema de trial
        if (typeof initializeAccountSystem === 'function') {
            initializeAccountSystem();
        }
    } else {
        // Mostrar tela de login
        document.getElementById('auth-screen')?.classList.remove('hidden');
        document.getElementById('app-main')?.classList.add('hidden');
    }
});

// ===== LOGOUT =====
function logout() {
    localStorage.setItem('loggedIn', 'false');
    location.reload();
}

// Exportar função de logout
window.logout = logout;
window.closeTrialWelcome = closeTrialWelcome;
