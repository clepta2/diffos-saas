# 🚀 Configuração do Supabase - Guia Completo

Este guia explica como configurar o Supabase (PostgreSQL) para o TechAssist.

## 🎯 Por que Supabase?

- ✅ **500 MB grátis** (2x mais que Vercel Postgres)
- ✅ **PostgreSQL completo** com todas as features
- ✅ **Auth integrado** (login, JWT, OAuth)
- ✅ **Realtime** - atualização automática do dashboard
- ✅ **Storage** - upload de fotos de aparelhos
- ✅ **API REST automática** - não precisa escrever código!
- ✅ **Row Level Security** - segurança por linha

## 📋 Passo a Passo

### 1. Criar Conta no Supabase (2 min)

1. Acesse [supabase.com](https://supabase.com)
2. Clique em **Start your project**
3. **Recomendado:** Clique em "Continue with GitHub" (mais rápido)
4. Autorize o Supabase no GitHub

### 2. Criar Projeto (3 min)

1. No dashboard, clique em **New project**
2. Preencha:
   - **Name:** `techassist-db`
   - **Database Password:** Crie uma senha forte (ANOTE!)
   - **Region:** **South America (São Paulo)** 🇧🇷
   - **Pricing Plan:** **Free**
3. Clique em **Create new project**
4. Aguarde 2-3 minutos (o banco está sendo criado)

### 3. Obter Credenciais (1 min)

Quando o projeto estiver pronto:

1. Vá em **Settings** (ícone de engrenagem) → **API**
2. Você verá:

```
Project URL: https://xxxxxxxxxxxxx.supabase.co
anon public key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

⚠️ **COPIE ESSES 2 VALORES!** Você vai precisar deles.

### 4. Criar as Tabelas (5 min)

1. No Supabase, vá em **SQL Editor** (ícone </> no menu lateral)
2. Clique em **New query**
3. **Cole TODO o SQL abaixo:**

```sql
-- Service Orders Table
CREATE TABLE IF NOT EXISTS service_orders (
  id VARCHAR(50) PRIMARY KEY,
  client VARCHAR(255) NOT NULL,
  subject VARCHAR(255) NOT NULL,
  device VARCHAR(255),
  brand VARCHAR(100),
  model VARCHAR(100),
  serial VARCHAR(100),
  imei VARCHAR(50),
  color VARCHAR(50),
  capacity VARCHAR(50),
  pattern_code VARCHAR(50),
  services TEXT,
  observations TEXT,
  chip VARCHAR(20),
  deadline VARCHAR(100),
  status VARCHAR(50) DEFAULT 'open',
  date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Clients Table
CREATE TABLE IF NOT EXISTS clients (
  id VARCHAR(50) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255),
  phone VARCHAR(50),
  company VARCHAR(255),
  address TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Sales Table
CREATE TABLE IF NOT EXISTS sales (
  id VARCHAR(50) PRIMARY KEY,
  client VARCHAR(255) NOT NULL,
  items TEXT NOT NULL,
  total DECIMAL(10, 2) NOT NULL,
  payment_method VARCHAR(50),
  date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Invoices Table
CREATE TABLE IF NOT EXISTS invoices (
  id VARCHAR(50) PRIMARY KEY,
  client VARCHAR(255) NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  status VARCHAR(50) DEFAULT 'unpaid',
  issue_date DATE,
  due_date DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Inventory Table
CREATE TABLE IF NOT EXISTS inventory (
  id VARCHAR(50) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  category VARCHAR(100),
  quantity INTEGER DEFAULT 0,
  price DECIMAL(10, 2),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Expenses Table
CREATE TABLE IF NOT EXISTS expenses (
  id VARCHAR(50) PRIMARY KEY,
  description VARCHAR(255) NOT NULL,
  category VARCHAR(100),
  amount DECIMAL(10, 2) NOT NULL,
  date DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Enable Row Level Security (RLS)
ALTER TABLE service_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE sales ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE inventory ENABLE ROW LEVEL SECURITY;
ALTER TABLE expenses ENABLE ROW LEVEL SECURITY;

-- Create policies (allow all for now - add auth later)
CREATE POLICY "Allow all operations" ON service_orders FOR ALL USING (true);
CREATE POLICY "Allow all operations" ON clients FOR ALL USING (true);
CREATE POLICY "Allow all operations" ON sales FOR ALL USING (true);
CREATE POLICY "Allow all operations" ON invoices FOR ALL USING (true);
CREATE POLICY "Allow all operations" ON inventory FOR ALL USING (true);
CREATE POLICY "Allow all operations" ON expenses FOR ALL USING (true);
```

4. Clique em **Run** (ou pressione Ctrl+Enter)
5. Você verá: "Success. No rows returned"

✅ **Tabelas criadas!**

### 5. Configurar Variáveis de Ambiente na Vercel (3 min)

1. Acesse [vercel.com/dashboard](https://vercel.com/dashboard)
2. Selecione o projeto **diffos-saas**
3. Vá em **Settings** → **Environment Variables**
4. Adicione as 2 variáveis:

| Nome | Valor | Ambiente |
|------|-------|----------|
| `SUPABASE_URL` | `https://xxxxx.supabase.co` | Production, Preview, Development |
| `SUPABASE_ANON_KEY` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` | Production, Preview, Development |

5. Clique em **Save** para cada uma

### 6. Fazer Redeploy (1 min)

1. Vá em **Deployments**
2. Clique nos **...** do último deploy
3. Selecione **Redeploy**
4. Aguarde 1-2 minutos

### 7. Testar a API (1 min)

Após o redeploy, teste:

**Verificar tabelas:**
```
https://tech.diffos.com.br/api/init-db
```

Resposta esperada:
```json
{
  "success": true,
  "message": "All tables exist",
  "tables": [...]
}
```

**Criar uma ordem de teste:**
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

✅ **API funcionando!**

## 🎨 Recursos Extras do Supabase

### 1. Ver Dados em Tempo Real

1. No Supabase, vá em **Table Editor**
2. Selecione uma tabela (ex: `service_orders`)
3. Você verá todos os dados em uma interface visual
4. Pode editar, adicionar ou deletar diretamente!

### 2. Realtime (Futuro)

Para atualização automática do dashboard:

```javascript
// No frontend
const channel = supabase
  .channel('orders')
  .on('postgres_changes', 
    { event: '*', schema: 'public', table: 'service_orders' },
    (payload) => {
      console.log('Change received!', payload)
      // Atualizar dashboard automaticamente
    }
  )
  .subscribe()
```

### 3. Storage (Futuro)

Para upload de fotos:

```javascript
const { data, error } = await supabase.storage
  .from('device-photos')
  .upload('OS-001/tela.jpg', file)
```

### 4. Auth (Futuro)

Para login de usuários:

```javascript
const { data, error } = await supabase.auth.signUp({
  email: 'user@example.com',
  password: 'senha123'
})
```

## 📊 Limites do Plano Gratuito

- **Database:** 500 MB
- **Storage:** 1 GB
- **Bandwidth:** 2 GB/mês
- **Realtime:** 200 conexões simultâneas
- **Auth:** Ilimitado

**Quando fazer upgrade:**
- Se ultrapassar 500MB → Pro Plan ($25/mês, 8GB)
- Se precisar de mais bandwidth → Pro Plan

## 🛡️ Segurança

- ✅ **Row Level Security (RLS)** ativado
- ✅ Políticas configuradas (allow all por enquanto)
- ✅ Conexão SSL automática
- ⚠️ **Próximo passo:** Adicionar autenticação e políticas por usuário

## 🔧 Comandos Úteis

### Ver logs em tempo real
```bash
# No terminal
supabase logs
```

### Backup do banco
1. Supabase → Settings → Database
2. Scroll até "Database Backups"
3. Download do backup mais recente

## 🆘 Troubleshooting

**Erro: "Invalid API key"**
- Verifique se copiou a `anon public key` corretamente
- Certifique-se de que fez redeploy após adicionar as variáveis

**Erro: "relation does not exist"**
- As tabelas não foram criadas
- Rode o SQL novamente no SQL Editor

**Erro: "new row violates row-level security policy"**
- As políticas RLS estão bloqueando
- Verifique se as policies foram criadas corretamente

## 🚀 Próximos Passos

1. ✅ Banco configurado
2. ⏳ Atualizar frontend para usar a API
3. ⏳ Adicionar autenticação de usuários
4. ⏳ Implementar Realtime
5. ⏳ Adicionar upload de fotos

---

**Dúvidas?** Consulte a [documentação oficial](https://supabase.com/docs)
