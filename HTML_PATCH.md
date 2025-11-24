# 🔧 Patch Manual para index.html

## Instruções

Abra o arquivo `index.html` em um editor de texto e faça as seguintes alterações:

### 1. Adicionar CSS (Linha ~20, após trial-system.css)

**ENCONTRE:**
```html
    <link rel="stylesheet" href="trial-system.css">

    <!-- Chart.js -->
```

**SUBSTITUA POR:**
```html
    <link rel="stylesheet" href="trial-system.css">
    <link rel="stylesheet" href="improvements.css">
    <link rel="stylesheet" href="layout-fix.css">

    <!-- Chart.js -->
```

### 2. Adicionar Scripts da API (Linha ~1058, onde estão os scripts)

**ENCONTRE:**
```html
    <!-- Scripts -->
    <script src="auth.js"></script>
```

**SUB STITUA POR:**
```html
    <!-- Scripts -->
    <script src="api-client.js"></script>
    <script src="api-helpers.js"></script>
    <script src="auth.js"></script>
```

### 3. Atualizar Título da Página (Linha ~7)

**ENCONTRE:**
```html
    <title>TechAssist - Sistema de Gestão</title>
```

**SUBSTITUA POR:**
```html
    <title>TechAssist | Diffos Tech Dashboard</title>
```

## Verificação

Após fazer essas mudanças, seu `index.html` deve ter:
- ✅ 2 novos links CSS (improvements.css, layout-fix.css)
- ✅ 2 novos scripts (api-client.js, api-helpers.js) ANTES do auth.js
- ✅ Título atualizado

## Alternativa: Copiar HTML Pronto

Se preferir, copie o conteúdo do arquivo `index.html.backup` (se existir) ou:

1. Faça backup do seu `index.html` atual
2. Abra no editor
3. Aplique as 3 mudanças acima manualmente
4. Salve

---

**Depois de aplicar o patch:**
```bash
git add index.html
git commit -m "feat: Add API scripts and CSS links to index.html"
git push
```
