# -------------------------------------------------------------------------
# PROJETO: CYBER RAFFLE OS (CONNECTION CYBER OS)
# ARQUIVO: E:\Projetos\connection-cyber-os\START_SESSION.ps1
# OBJETIVO: ORQUESTRAÇÃO DE INICIALIZAÇÃO v1.3
# -------------------------------------------------------------------------

[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
Clear-Host
Write-Host "==========================================================" -ForegroundColor Green
Write-Host "      CONNECTION CYBER OS | CYBER RAFFLE OS v1.0          " -ForegroundColor White -BackgroundColor DarkGreen
Write-Host "            INICIANDO SESSÃO DE DESENVOLVIMENTO           " -ForegroundColor Green
Write-Host "==========================================================" -ForegroundColor Green

# 1. VALIDAÇÃO DE VOLUME DE ORIGEM
Write-Host "[1/4] Validando integridade do Volume PROJETOS (E:)..." -ForegroundColor Yellow
$VolOrigem = Get-Volume -DriveLetter E -ErrorAction SilentlyContinue
if ($VolOrigem.FileSystemLabel -ne "PROJETOS") {
    Write-Host "  [ALERTA] Volume 'PROJETOS' não detectado em E:. Verifique o disco." -ForegroundColor Red
    Pause; Exit
}
Write-Host "  [OK] Volume PROJETOS autenticado." -ForegroundColor Green

# 2. LIMPEZA DE CACHE E PROCESSOS
Write-Host "`n[2/4] Purgando caches e processos fantasmas (Porta 3000)..." -ForegroundColor Yellow
if (Test-Path "web\.next") { 
    Remove-Item -Path "web\.next" -Recurse -Force -ErrorAction SilentlyContinue 
}

$conn = Get-NetTCPConnection -LocalPort 3000 -ErrorAction SilentlyContinue
if ($conn) {
    $pidTarget = $conn.OwningProcess
    if ($pidTarget -gt 4) {
        Stop-Process -Id $pidTarget -Force
        Write-Host "  [OK] PID $pidTarget encerrado." -ForegroundColor Green
    }
}

# 3. DISPARO DO MOTOR NEXT.JS + WEBPACK
Write-Host "`n[3/4] Disparando motor Webpack (Suporte PWA)..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd web; npm run dev -- --webpack" -WindowStyle Normal

Write-Host "`n[4/4] Operação concluída. Terminal operacional." -ForegroundColor Green
Write-Host "==========================================================" -ForegroundColor Green