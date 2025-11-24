---
description: "Start from scratch – step‑by‑step plan for rebuilding the TechAssist frontend"
---
# 🚀 Plano de início rápido

## 1️⃣ Preparar a base visual
- **style.css** já contém o design system *Claymorphism* (cores, sombras, tipografia, utilitários e componentes básicos como `.clay-card`, `.clay-input`, `.btn`).
- Verificar se o **index.html** carrega `style.css` e `api-client.js`/`api-helpers.js`.

## 2️⃣ Estrutura de páginas
Crie arquivos HTML vazios que servirão como “templates” que serão preenchidos via JavaScript:
- `auth-screen.html` – tela de login/registro.
- `dashboard.html` – visão geral com cards e gráficos.
- `orders.html` – lista de ordens de serviço.
- `clients.html` – gerenciamento de clientes.

## 3️⃣ Router simples (vanilla JS)
- Adicione **router.js** que escuta `window.location.hash` e injeta o conteúdo correto dentro de `#app`.
- Exemplo de rotas: `#login`, `#dashboard`, `#orders`.

## 4️⃣ Tela de autenticação
- Use os componentes **.clay-card**, **.clay-input** e **.btn** definidos em `style.css`.
- Implementar lógica de login em **auth.js** que chama `window.api.login(email, password)` (já disponível em `api-client.js`).
- Após sucesso, redirecionar para `#dashboard`.

## 5️⃣ Dashboard
- Crie **dashboard.js** que carrega dados via `window.api.getOrders()`, `getClients()`, etc.
- Use **Chart.js** para gráficos (já incluído no `<head>`).
- Cada bloco de informação deve ser um **.clay-card**.

## 6️⃣ CRUD de ordens e clientes
- Componentes reutilizáveis **form-card.js** e **list-card.js**.
- Conectar a API usando funções de `api-helpers.js` (ex.: `createOrder`, `updateClient`).

## 7️⃣ Responsividade & Acessibilidade
- Testar em telas < 768px (já há media query no CSS).
- Garantir contraste adequado e foco visível nos inputs.

## 8️⃣ Deploy & CI
- Commit incremental após cada etapa.
- Use `npm run dev` (ou `vite` se decidir migrar para um bundler) para desenvolvimento local.
- Quando tudo estiver estável, `npm run build` e push para Vercel.

# 📋 Checklist rápido
- [ ] `style.css` importado em `index.html` ✅
- [ ] `api-client.js` e `api-helpers.js` carregados ✅
- [ ] Criar `router.js` e incluir no `<head>`.
- [ ] Implementar `auth-screen.html` + `auth.js`.
- [ ] Implementar `dashboard.html` + `dashboard.js`.
- [ ] Testar fluxo de login → dashboard.
- [ ] Adicionar rotas para ordens e clientes.
- [ ] Commit & push.

---
*Este plano pode ser ajustado conforme suas prioridades. Basta me dizer por onde quer começar ou se prefere que eu já crie algum dos arquivos acima.*
