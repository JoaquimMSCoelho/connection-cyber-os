# -------------------------------------------------------------------------
# PROJETO: CYBER RAFFLE OS (CONNECTION CYBER OS)
# ARQUIVO: E:\Projetos\connection-cyber-os\CHECK_INTEGRITY.ps1
# OBJETIVO: AUDITORIA DE CÓDIGO E TIPAGEM PRÉ-BACKUP
# -------------------------------------------------------------------------

[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
Clear-Host
Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "      CONNECTION CYBER OS | CHECK DE INTEGRIDADE          " -ForegroundColor White -BackgroundColor DarkCyan
Write-Host "            VALIDANDO TYPESCRIPT E LINTING                " -ForegroundColor Cyan
Write-Host "==========================================================" -ForegroundColor Cyan

# 1. VERIFICAÇÃO DE LOCALIZAÇÃO
Write-Host "[1/3] Validando diretório de execução..." -ForegroundColor Yellow
if (Test-Path "web\package.json") {
    Set-Location -Path "web"
    Write-Host "  [OK] Ambiente de aplicação localizado." -ForegroundColor Green
} else {
    Write-Host "  [CRÍTICO] package.json não encontrado em .\web. Abortando." -ForegroundColor Red
    Pause; Exit
}

# 2. AUDITORIA DE TIPAGEM (TypeScript Strict Mode)
Write-Host "`n[2/3] Executando Type-Check (tsc --noEmit)..." -ForegroundColor Yellow
Write-Host "      Isso garante conformidade com o Módulo 04 [cite: 2026-02-04]" -ForegroundColor Gray
npm run type-check

if ($LASTEXITCODE -eq 0) {
    Write-Host "  [SUCCESS] Todos os tipos TypeScript estão íntegros." -ForegroundColor Green
} else {
    Write-Host "  [FALHA] Erros de tipagem detectados! Corrija antes de prosseguir." -ForegroundColor Red
    $errorState = $true
}

# 3. AUDITORIA DE PADRÕES (Lint)
Write-Host "`n[3/3] Executando Next Lint..." -ForegroundColor Yellow
npm run lint

if ($LASTEXITCODE -eq 0) {
    Write-Host "  [SUCCESS] Padrões de código validados." -ForegroundColor Green
} else {
    Write-Host "  [AVISO] O Lint detectou inconsistências menores." -ForegroundColor Yellow
}

Write-Host "`n==========================================================" -ForegroundColor Cyan
if ($errorState) {
    Write-Host "     ATENÇÃO: O SISTEMA POSSUI ERROS CRÍTICOS DE TIPO.    " -ForegroundColor Red
} else {
    Write-Host "     SISTEMA EM CONFORMIDADE. PRONTO PARA O BACKUP.       " -ForegroundColor Green
}
Write-Host "==========================================================" -ForegroundColor Cyan
Set-Location -Path ".."