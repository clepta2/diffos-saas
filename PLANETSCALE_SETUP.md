# 🌍 Configuração do PlanetScale - Guia Completo

Este guia explica como configurar o banco de dados MySQL do PlanetScale para o TechAssist.

## 🎯 Por que PlanetScale?

- ✅ **5GB grátis** (vs 256MB do Vercel Postgres)
- ✅ **1 bilhão de leituras/mês** no plano gratuito
- ✅ **Branching** - cria "branches" do banco como Git
- ✅ **Escalabilidade automática**
- ✅ **Sem downtime** em mudanças de schema

## 📋 Passo a Passo

### 1. Criar Conta no PlanetScale

1. Acesse [planetscale.com](https://planetscale.com)
2. Clique em **Sign up** (pode usar GitHub)
3. Confirme seu email

### 2. Criar o Banco de Dados

1. No dashboard, clique em **Create a database**
2. **Nome:** `techassist-db` (ou o que preferir)
3. **Região:** Escolha a mais próxima:
   - **AWS São Paulo** (sa-east-1) - RECOMENDADO para Brasil
   - ou AWS us-east-1 (Virginia)
4. **Plan:** Free (5GB)
5. Clique em **Create database**

### 3. Obter as Credenciais

1. No banco criado, vá em **Connect**
2. Selecione **Create password**
3. **Nome da senha:** `vercel-production`
4. Clique em **Create password**

Você verá algo assim:
```
Host: aws.connect.psdb.cloud
Username: xxxxxxxxx
Password: pscale_pw_xxxxxxxxx
```

⚠️ **IMPORTANTE:** Copie essas credenciais agora! Você não poderá vê-las novamente.

### 4. Configurar Variáveis de Ambiente na Vercel

1. Acesse [vercel.com/dashboard](https://vercel.com/dashboard)
2. Selecione o projeto **diffos-saas**
3. Vá em **Settings** > **Environment Variables**
4. Adicione as 3 variáveis:

| Nome | Valor | Ambiente |
|------|-------|----------|
| `DATABASE_HOST` | `aws.connect.psdb.cloud` | Production, Preview, Development |
| `DATABASE_USERNAME` | `seu_username_aqui` | Production, Preview, Development |
| `DATABASE_PASSWORD` | `pscale_pw_xxxxxxxxx` | Production, Preview, Development |

5. Clique em **Save** para cada uma

### 5. Fazer Redeploy

Após adicionar as variáveis:

1. Vá em **Deployments**
2. Clique nos **...** do último deploy
3. Selecione **Redeploy**

### 6. Inicializar as Tabelas

Após o redeploy (aguarde 1-2 minutos), acesse:

```
https://tech.diffos.com.br/api/init-db
```

Você verá:
```json
{
  "success": true,
  "message": "Database initialized successfully",
  "tables": [
    "service_orders",
    "clients",
    "sales",
    "invoices",
    "inventory",
    "expenses"
  ]
}
```

✅ **Pronto! Banco configurado!**

### 7. Testar a API

**Listar Ordens:**
```bash
curl https://tech.diffos.com.br/api/orders
```

**Criar Ordem:**
```bash
curl -X POST https://tech.diffos.com.br/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "id": "OS-001",
    "client": "João Silva",
    "subject": "Troca de tela",
    "device": "iPhone 12",
    "status": "open"
  }'
```

## 🔧 Comandos Úteis

### Ver Dados no PlanetScale (Console Web)

1. No dashboard do PlanetScale
2. Vá em **Console**
3. Execute queries SQL:

```sql
-- Ver todas as ordens
SELECT * FROM service_orders;

-- Contar clientes
SELECT COUNT(*) FROM clients;

-- Ver vendas do mês
SELECT * FROM sales WHERE MONTH(date) = MONTH(CURRENT_DATE());
```

### Criar Branch (para testar mudanças)

```bash
# Instalar CLI (opcional)
brew install planetscale/tap/pscale

# Criar branch de desenvolvimento
pscale branch create techassist-db development

# Conectar à branch
pscale connect techassist-db development
```

## 📊 Estrutura das Tabelas

### service_orders
```sql
id VARCHAR(50) PRIMARY KEY
client VARCHAR(255) NOT NULL
subject VARCHAR(255) NOT NULL
device, brand, model, serial, imei
color, capacity, pattern_code
services TEXT (JSON)
observations TEXT
chip VARCHAR(20)
deadline VARCHAR(100)
status VARCHAR(50) DEFAULT 'open'
date, created_at, updated_at TIMESTAMP
```

### clients
```sql
id, name, email, phone, company, address
created_at, updated_at
```

### sales
```sql
id, client, items (JSON), total, payment_method, date
```

### inventory
```sql
id, name, category, quantity, price
```

### expenses
```sql
id, description, category, amount, date
```

## 🛡️ Segurança

- ✅ Credenciais seguras nas variáveis de ambiente
- ✅ Conexão SSL automática
- ✅ CORS configurado
- ⚠️ **Próximo passo:** Adicionar autenticação JWT

## 💰 Limites do Plano Gratuito

- **Storage:** 5 GB
- **Leituras:** 1 bilhão/mês
- **Escritas:** 10 milhões/mês
- **Branches:** 1 (main)

**Quando fazer upgrade:**
- Se ultrapassar 5GB → Scaler Plan ($29/mês, 25GB)
- Se precisar de múltiplas branches → Scaler Plan

## 🚀 Próximos Passos

1. ✅ Banco configurado
2. ⏳ Atualizar frontend para usar a API
3. ⏳ Adicionar autenticação
4. ⏳ Implementar backup automático

## 🆘 Troubleshooting

**Erro: "Connection refused"**
- Verifique se as variáveis de ambiente estão corretas
- Certifique-se de que fez redeploy após adicionar as variáveis

**Erro: "Table already exists"**
- Normal se rodar `/api/init-db` mais de uma vez
- As tabelas só são criadas se não existirem

**Erro: "Authentication failed"**
- Verifique se copiou a senha corretamente
- Crie uma nova senha no PlanetScale se necessário

---

**Dúvidas?** Consulte a [documentação oficial](https://planetscale.com/docs)
