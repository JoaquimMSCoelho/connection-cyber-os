# -------------------------------------------------------------------------
# PROJETO: CYBER RAFFLE OS | AUDITORIA DE AMBIENTE
# ARQUIVO: E:\Projetos\connection-cyber-os\AUDIT_CYBER.ps1
# -------------------------------------------------------------------------

Clear-Host
Write-Host ">>> AUDITORIA SISTÊMICA DE INTEGRIDADE <<<" -ForegroundColor Cyan

# 1. VERIFICAÇÃO .ENV.LOCAL
Write-Host "`n[1/2] Validando Variáveis de Ambiente..." -ForegroundColor Yellow
$envPath = "web\.env.local"
if (Test-Path $envPath) {
    $content = Get-Content $envPath
    if ($content -match "NEXT_PUBLIC_SUPABASE_URL" -and $content -match "NEXT_PUBLIC_SUPABASE_ANON_KEY") {
        Write-Host "  [OK] Conexão Supabase configurada." -ForegroundColor Green
    } else {
        Write-Host "  [CRÍTICO] Chaves ausentes no .env.local!" -ForegroundColor Red
    }
} else {
    Write-Host "  [ERRO] Arquivo .env.local não encontrado!" -ForegroundColor Red
}

# 2. MÉTRICAS DO SRC
$SrcPath = "web\src"
$FileCount = (Get-ChildItem -Path $SrcPath -Recurse -File | Measure-Object).Count
Write-Host "`n[2/2] Métricas de Código:" -ForegroundColor Yellow
Write-Host "  > Arquivos fonte em src: $FileCount" -ForegroundColor White
Write-Host "==========================================" -ForegroundColor Cyan