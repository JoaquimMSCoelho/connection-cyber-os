Clear-Host
Write-Host ">>> AUDITORIA SISTÊMICA: CONNECTION CYBER OS <<<" -ForegroundColor Cyan

# 1. VALIDAÇÃO SUPABASE
Write-Host "`n[1/2] Verificando Variáveis de Ambiente..." -ForegroundColor Yellow
if (Test-Path "web\.env.local") {
    $content = Get-Content "web\.env.local"
    if ($content -match "NEXT_PUBLIC_SUPABASE_URL" -and $content -match "NEXT_PUBLIC_SUPABASE_ANON_KEY") {
        Write-Host "  [OK] Conexão Supabase configurada." -ForegroundColor Green
    } else {
        Write-Host "  [CRÍTICO] Chaves ausentes!" -ForegroundColor Red
    }
}

# 2. MÉTRICAS
$FileCount = (Get-ChildItem -Path "web\src" -Recurse -File | Measure-Object).Count
Write-Host "`n[2/2] Métricas de Código:" -ForegroundColor Yellow
Write-Host "  > Arquivos em src: $FileCount" -ForegroundColor White