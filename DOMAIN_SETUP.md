# 🌐 Configuração de Domínio: tech.diffos.com.br

Este documento descreve como configurar o subdomínio `tech.diffos.com.br` para este painel SaaS (TechAssist).

## 1. Objetivo
Separar o painel técnico (TechAssist) do painel principal do site (`diffos.com.br`).

*   **diffos.com.br**: Site principal / Dashboard Administrativo Geral.
*   **tech.diffos.com.br**: Dashboard Operacional para Técnicos (Este Projeto).

## 2. Configuração na Vercel

Para apontar este projeto para o subdomínio:

1.  Acesse o dashboard da **Vercel**.
2.  Selecione o projeto **diffos-saas**.
3.  Vá em **Settings** > **Domains**.
4.  Adicione o domínio: `tech.diffos.com.br`.
    *   Se você comprou o domínio na Vercel, será automático.
    *   Se comprou externamente (GoDaddy, Registro.br, etc.), siga o passo 3.

## 3. Configuração de DNS (Se externo)

No painel do seu registrador de domínio (onde você comprou `diffos.com.br`), adicione um registro **CNAME**:

*   **Tipo:** CNAME
*   **Nome (Host):** tech
*   **Valor (Target):** cname.vercel-dns.com
*   **TTL:** Padrão (ou 3600)

## 4. Verificação

Após a propagação do DNS (pode levar de alguns minutos a 24h):
1.  Acesse `https://tech.diffos.com.br`.
2.  O painel TechAssist deve carregar corretamente.

## 5. Próximos Passos (Integração)

Futuramente, para integrar com o `diffos.com.br`:
*   Adicionar botão "Ir para Painel Principal" na Sidebar.
*   Compartilhar autenticação (SSO) se necessário.
