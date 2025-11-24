# 🌐 CONFIGURAÇÃO DNS: diffos.com.br

Aqui estão os registros exatos para configurar seu domínio na Vercel.

## 📋 **ONDE CONFIGURAR:**
Provavelmente no **Registro.br** (já que é .com.br) ou no seu provedor de hospedagem atual.

## ⚙️ **REGISTROS NECESSÁRIOS:**

Adicione estes 2 registros na zona DNS:

| Tipo | Nome (Host) | Valor / Destino |
|------|-------------|-----------------|
| **A** | `@` (ou deixe em branco) | `76.76.21.21` |
| **CNAME** | `www` | `cname.vercel-dns.com` |

---

## 🚀 **PASSO A PASSO NO REGISTRO.BR:**

1. Acesse [registro.br](https://registro.br) e faça login.
2. Clique no domínio **diffos.com.br**.
3. Vá até a seção **DNS**.
4. Clique em **"Editar Zona"** (ou "Configurar Endereçamento").
5. Clique em **"Modo Avançado"** se disponível.
6. **Adicionar Nova Entrada:**
   - **Nome:** (deixe vazio)
   - **Tipo:** A
   - **Dados:** `76.76.21.21`
7. **Adicionar Nova Entrada:**
   - **Nome:** `www`
   - **Tipo:** CNAME
   - **Dados:** `cname.vercel-dns.com`
8. Clique em **Salvar**.

---

## ⏳ **PROPAGAÇÃO:**
- Pode levar de 1 a 24 horas para funcionar completamente.
- A Vercel detectará automaticamente e gerará o certificado SSL (HTTPS).

## 📧 **EMAIL (Opcional):**
Se você usa email profissional (ex: `contato@diffos.com.br`), **NÃO** apague os registros do tipo `MX`. Mantenha-os como estão.
