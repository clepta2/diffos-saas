# 🛠️ TechAssist - Technical Assistance SaaS

> Sistema completo de gestão para assistências técnicas com trial de 7 dias

![TechAssist](https://img.shields.io/badge/Status-Em%20Desenvolvimento-yellow)
![License](https://img.shields.io/badge/License-MIT-blue)
![Version](https://img.shields.io/badge/Version-1.0.0-green)

## 🚀 **Sobre o Projeto**

TechAssist é uma plataforma SaaS completa para gestão de assistências técnicas, oferecendo:

- ✅ **Gestão de Ordens de Serviço** - Controle completo com Kanban e lista
- ✅ **Vendas e Estoque** - Sistema integrado de vendas e inventário
- ✅ **Clientes** - CRM simplificado
- ✅ **Notas Fiscais** - Emissão e controle
- ✅ **Dashboard Analítico** - Métricas e relatórios em tempo real
- ✅ **Sistema de Planos** - 4 planos (Starter, Professional, Business, Enterprise)
- ✅ **Trial de 7 Dias** - Teste grátis sem cartão de crédito
- ✅ **Multi-idioma** - 5 idiomas suportados
- ✅ **Tema Claro/Escuro** - Interface personalizável

## 🎨 **Design**

- Design System: **Claymorphism**
- Cores: Gradientes modernos e suaves
- Responsivo: Mobile-first
- Animações: Suaves e profissionais

## 🏗️ **Tecnologias**

- **Frontend:** HTML5, CSS3 (Vanilla), JavaScript (ES6+)
- **Charts:** Chart.js
- **Storage:** LocalStorage (offline-first)
- **Deployment:** Vercel
- **Version Control:** Git/GitHub

## 📦 **Estrutura do Projeto**

```
sidereal-horizon/
├── index.html                 # Página principal
├── style.css                  # Estilos principais
├── script.js                  # Lógica principal
├── auth.css                   # Estilos de autenticação
├── auth.js                    # Lógica de login/signup
├── pricing.css                # Estilos de planos
├── pricing.js                 # Lógica de assinaturas
├── trial-system.css           # Estilos do trial
├── trial-system.js            # Sistema de trial 7 dias
├── improvements.js            # Melhorias e máscaras
├── vercel.json                # Configuração Vercel
└── README.md                  # Este arquivo
```

## 🚀 **Deploy**

### **Opção 1: Vercel (Recomendado)**

1. Faça fork deste repositório
2. Conecte com Vercel: [https://vercel.com/new](https://vercel.com/new)
3. Importe o repositório
4. Deploy automático! ✨

### **Opção 2: Outros Serviços**

- **Netlify:** Arraste a pasta para [netlify.com/drop](https://netlify.com/drop)
- **GitHub Pages:** Ative nas configurações do repositório
- **Firebase Hosting:** `firebase deploy`

## 💻 **Desenvolvimento Local**

```bash
# Clone o repositório
git clone https://github.com/SEU-USUARIO/sidereal-horizon.git

# Entre na pasta
cd sidereal-horizon

# Inicie servidor local
python -m http.server 8000
# ou
npx serve

# Acesse
http://localhost:8000
```

## 🔐 **Login de Teste**

- **Email:** demo@techassist.com
- **Senha:** password

## 📋 **Planos Disponíveis**

| Plano | Preço Mensal | Preço Anual | Usuários | OS/mês |
|-------|--------------|-------------|----------|--------|
| **Starter** | R$ 49,90 | R$ 29,90 | 1 (+2) | 50 |
| **Professional** | R$ 99,90 | R$ 59,90 | 3 | 200 |
| **Business** | R$ 199,90 | R$ 119,90 | 10 | 1.000 |
| **Enterprise** | Sob consulta | Sob consulta | ∞ | ∞ |

## 🎁 **Trial de 7 Dias**

- ✅ Teste grátis por 7 dias
- ✅ Sem necessidade de cartão de crédito
- ✅ Acesso a todos os recursos do plano Starter
- ✅ Após expiração, escolha obrigatória de plano

## 🌐 **Multi-idioma**

Idiomas suportados:
- 🇧🇷 Português (BR)
- 🇺🇸 Inglês (EN)
- 🇪🇸 Espanhol (ES)
- 🇫🇷 Francês (FR)
- 🇩🇪 Alemão (DE)

## 📊 **Funcionalidades**

### **Gestão de Ordens de Serviço**
- Criar, editar, deletar OS
- Kanban board drag-and-drop
- Filtros por status
- Pattern lock para smartphones
- Checklist de entrega
- Histórico de ações

### **Vendas**
- Gestão de produtos do estoque
- Múltiplas formas de pagamento
- Sistema de descontos (% ou R$)
- Mensagem de despedida personalizável
- Impressão (A4 ou Térmica)

### **Clientes**
- Cadastro completo (CPF/CNPJ)
- Busca de CEP automática
- Taxa de entrega personalizada
- Histórico de compras
- Edição inline

### **Dashboard**
- Gráficos interativos (Chart.js)
- KPIs em tempo real
- Últimas 7 dias de atividade
- Distribuição de status

## 🔜 **Roadmap**

- [ ] Integração com gateway de pagamento
- [ ] Geração de PDF para OS e vendas
- [ ] Sistema de notificações (Email/SMS)
- [ ] App Mobile (PWA)
- [ ] API REST
- [ ] Backup automático em nuvem
- [ ] Inteligência Artificial preditiva
- [ ] Multi-tenant (SaaS real)

## 🤝 **Contribuindo**

Contribuições são bem-vindas! Para contribuir:

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/NovaFuncionalidade`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/NovaFuncionalidade`)
5. Abra um Pull Request

## 📝 **Licença**

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👤 **Autor**

**Seu Nome**
- GitHub: [@seu-usuario](https://github.com/seu-usuario)
- LinkedIn: [seu-perfil](https://linkedin.com/in/seu-perfil)

## 🙏 **Agradecimentos**

- Chart.js pela biblioteca de gráficos
- Google Fonts pela tipografia Outfit
- Comunidade open-source

---

**⭐ Se este projeto te ajudou, deixe uma estrela!**

## 📞 **Suporte**

- Email: suporte@techassist.com
- Documentação: [docs.techassist.com](https://docs.techassist.com)
- Discord: [discord.gg/techassist](https://discord.gg/techassist)
