# 🌐 COMO ADICIONAR SEU DOMÍNIO PERSONALIZADO

## 📋 **QUANDO ADICIONAR:**

✅ **DEPOIS** que o site estiver funcionando na Vercel
✅ **DEPOIS** de testar tudo em `techassist-saas.vercel.app`

---

## 🚀 **PASSO A PASSO:**

### **1. Faça Deploy na Vercel Primeiro**
```
Seu site → GitHub → Vercel
                      ↓
            techassist-saas.vercel.app
                      ↓
            ✅ TESTE TUDO AQUI PRIMEIRO
```

### **2. Depois que Estiver Funcionando:**

#### **2.1 No Dashboard da Vercel:**

1. Acesse: [https://vercel.com/dashboard](https://vercel.com/dashboard)
2. Clique no seu projeto `techassist-saas`
3. Vá em **Settings** → **Domains**
4. Clique em **"Add"**
5. Digite seu domínio: `seudominio.com`
6. Clique em **"Add"**

#### **2.2 Configurar DNS no Provedor do Domínio:**

A Vercel vai mostrar as configurações de DNS:

**Opção A: Registros A (Recomendado)**
```
Tipo: A
Nome: @
Valor: 76.76.21.21
```

**Opção B: CNAME**
```
Tipo: CNAME
Nome: www
Valor: cname.vercel-dns.com
```

#### **2.3 Onde Configurar DNS:**

**Se seu domínio está em:**

📍 **Registro.br** (Brasil):
1. Acesse: [https://registro.br](https://registro.br)
2. Login → Meus Domínios
3. Clique em seu domínio
4. Editores de Zona DNS
5. Adicione os registros acima

📍 **GoDaddy:**
1. Acesse: DNS Management
2. Adicione os registros A/CNAME

📍 **Namecheap:**
1. Domain List → Manage
2. Advanced DNS → Add New Record

📍 **Cloudflare:**
1. DNS → Add record
2. Adicione os registros

---

## ⏰ **TEMPO DE PROPAGAÇÃO:**

- DNS pode levar de **15 minutos a 48 horas**
- Geralmente funciona em **1-2 horas**
- Você pode verificar em: [https://dnschecker.org](https://dnschecker.org)

---

## 🎯 **SUBDOMÍNIOS (www):**

Para `www.seudominio.com` funcionar também:

1. Na Vercel, adicione: `www.seudominio.com`
2. Configure CNAME:
```
Tipo: CNAME
Nome: www
Valor: cname.vercel-dns.com
```

3. A Vercel redireciona automaticamente!

---

## 🔒 **HTTPS/SSL:**

✅ **Automático!** A Vercel cuida disso:
- SSL grátis via Let's Encrypt
- Renovação automática
- HTTPS forçado
- Certificado válido em ~10 minutos

---

## 📊 **EXEMPLO COMPLETO:**

### **Seu domínio:** `techassist.com.br`

**No Registro.br:**
```
Tipo    Nome    Valor
A       @       76.76.21.21
CNAME   www     cname.vercel-dns.com
```

**Na Vercel:**
```
Domínios adicionados:
✅ techassist.com.br (primary)
✅ www.techassist.com.br
```

**Resultado:**
```
https://techassist.com.br → Funciona! 🎉
https://www.techassist.com.br → Redireciona para acima
```

---

## 🔍 **VERIFICAR SE FUNCIONOU:**

### **1. DNS Checker:**
```
https://dnschecker.org
Digite: seudominio.com
```

### **2. Terminal:**
```bash
# Windows PowerShell
nslookup seudominio.com

# Deve retornar: 76.76.21.21
```

### **3. Browser:**
```
https://seudominio.com
```

---

## ⚠️ **PROBLEMAS COMUNS:**

### **"Domain is not configured correctly"**
**Solução:**
- Aguarde propagação de DNS (até 48h)
- Verifique se os registros estão corretos
- Remova registros antigos conflitantes

### **"DNS not found"**
**Solução:**
- Verifique se digitou corretamente
- Confirme que o domínio está ativo
- Aguarde mais tempo

### **"SSL Certificate Pending"**
**Solução:**
- Normal, aguarde 10-15 minutos
- A Vercel gera certificado automaticamente

---

## 📧 **CONFIGURAR EMAIL:**

Se quiser email no mesmo domínio:

### **Opção 1: Google Workspace (Pago)**
```
MX Records conforme Google
Valor aproximado: US$ 6/usuário/mês
```

### **Opção 2: Zoho Mail (Grátis até 5 usuários)**
```
MX Records conforme Zoho
https://zoho.com/mail
```

### **Opção 3: ImprovMX (Grátis - Apenas Forward)**
```
MX Records conforme ImprovMX
Encaminha emails para Gmail
https://improvmx.com
```

---

## 🎯 **CHECKLIST:**

- [ ] Site funcionando em `*.vercel.app`
- [ ] Domínio adicionado na Vercel
- [ ] Registros DNS configurados no provedor
- [ ] Aguardado propagação (1-48h)
- [ ] DNS verificado em dnschecker.org
- [ ] Site acessível via domínio personalizado
- [ ] HTTPS funcionando (cadeado verde)
- [ ] Redirecionamento www → apex funcionando

---

## 🎨 **DOMÍNIOS MÚLTIPLOS:**

Você pode ter vários domínios para o mesmo site:

```
techassist.com.br → Produção (Brasil)
techassist.com → Produção (Global)
staging.techassist.com.br → Testes
```

**Na Vercel:**
1. Adicione todos os domínios
2. Marque um como "Primary"
3. Outros redirecionam automaticamente

---

## 💡 **DICA PRO:**

### **Ambiente de Staging:**

1. Crie branch `develop` no Git
2. Vercel cria preview automático
3. Adicione subdomínio `staging.seudominio.com`
4. Aponte para o preview da branch develop

```
main → seudominio.com (Produção)
develop → staging.seudominio.com (Testes)
```

---

## 📞 **SUPORTE:**

**Vercel:**
- Docs: [vercel.com/docs/concepts/projects/domains](https://vercel.com/docs/concepts/projects/domains)
- Support: [vercel.com/support](https://vercel.com/support)

**DNS:**
- DNSChecker: [dnschecker.org](https://dnschecker.org)
- DNS Lookup: [mxtoolbox.com](https://mxtoolbox.com)

---

## ✅ **RESUMO:**

1. **Agora:** Deploy na Vercel (URL grátis)
2. **Teste:** Verifique se tudo funciona
3. **Depois:** Adicione domínio personalizado
4. **Configure:** DNS no provedor do domínio
5. **Aguarde:** Propagação (1-48h)
6. **Pronto:** Acesse seu domínio! 🎉

---

**Qual é seu domínio?** Me conte para eu criar as instruções específicas! 😊
