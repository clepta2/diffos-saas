# 🗄️ Configuração do Banco de Dados - Vercel Postgres

Este guia explica como configurar o banco de dados Postgres na Vercel para o TechAssist.

## 📋 Pré-requisitos
- Projeto já deployado na Vercel
- Acesso ao dashboard da Vercel

## 🚀 Passo a Passo

### 1. Criar o Banco de Dados na Vercel

1. Acesse o [Dashboard da Vercel](https://vercel.com/dashboard)
2. Selecione seu projeto **diffos-saas**
3. Vá em **Storage** (no menu lateral)
4. Clique em **Create Database**
5. Selecione **Postgres**
6. Escolha a região mais próxima (ex: `São Paulo - Brazil`)
7. Clique em **Create**

### 2. Conectar o Banco ao Projeto

1. Após criar, você verá a tela de configuração
2. Clique em **Connect Project**
3. Selecione o projeto **diffos-saas**
4. Clique em **Connect**

**Pronto!** A Vercel automaticamente criará as variáveis de ambiente necessárias:
- `POSTGRES_URL`
- `POSTGRES_PRISMA_URL`
- `POSTGRES_URL_NON_POOLING`
- `POSTGRES_USER`
- `POSTGRES_HOST`
- `POSTGRES_PASSWORD`
- `POSTGRES_DATABASE`

### 3. Inicializar as Tabelas

Após o deploy, acesse uma única vez:

```
https://tech.diffos.com.br/api/init-db
```

Você verá uma resposta JSON confirmando que as tabelas foram criadas:

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

### 4. Testar a API

Você pode testar os endpoints diretamente:

**Listar Ordens:**
```
GET https://tech.diffos.com.br/api/orders
```

**Criar Ordem:**
```
POST https://tech.diffos.com.br/api/orders
Content-Type: application/json

{
  "id": "OS-001",
  "client": "João Silva",
  "subject": "Troca de tela",
  "device": "iPhone 12",
  "status": "open"
}
```

## 📊 Estrutura das Tabelas

### service_orders
- `id` - ID único da ordem
- `client` - Nome do cliente
- `subject` - Assunto/problema
- `device` - Dispositivo
- `brand`, `model`, `serial`, `imei` - Dados do aparelho
- `color`, `capacity` - Especificações
- `pattern_code` - Código do padrão de desbloqueio
- `services` - Serviços a realizar (JSON)
- `observations` - Observações
- `chip` - Com/sem chip
- `deadline` - Prazo
- `status` - Status (open, pending, resolved)
- `date`, `created_at`, `updated_at` - Timestamps

### clients
- `id`, `name`, `email`, `phone`, `company`, `address`

### sales
- `id`, `client`, `items` (JSON), `total`, `payment_method`, `date`

### inventory
- `id`, `name`, `category`, `quantity`, `price`

### expenses
- `id`, `description`, `category`, `amount`, `date`

## 🔧 Próximos Passos

Agora você precisa atualizar o frontend (`script.js`) para usar a API em vez do `localStorage`.

Vou criar um arquivo `api-client.js` que substituirá as funções de `loadData()` e `saveData()`.

## 🛡️ Segurança

- ✅ As credenciais do banco ficam seguras nas variáveis de ambiente da Vercel
- ✅ Nenhuma senha é exposta no código frontend
- ✅ CORS configurado para aceitar requisições do seu domínio
- ⚠️ **Importante:** Adicione autenticação JWT nas próximas versões para proteger a API

## 💰 Custos

- **Vercel Postgres (Hobby):** Grátis até 256 MB
- **Vercel Postgres (Pro):** $20/mês para 512 MB

Para começar, o plano gratuito é mais que suficiente!
