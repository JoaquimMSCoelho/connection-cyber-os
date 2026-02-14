[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
Clear-Host
Write-Host "==========================================================" -ForegroundColor Green
Write-Host "      CONNECTION CYBER OS | START ENGINE v1.4             " -ForegroundColor White -BackgroundColor DarkGreen
Write-Host "==========================================================" -ForegroundColor Green

# 1. VALIDAÇÃO DE VOLUME
Write-Host "[1/4] Validando Volume PROJETOS (E:)..." -ForegroundColor Yellow
$VolOrigem = Get-Volume -DriveLetter E -ErrorAction SilentlyContinue
if ($VolOrigem.FileSystemLabel -ne "PROJETOS") {
    Write-Host "  [ALERTA] Volume 'PROJETOS' não detectado em E:." -ForegroundColor Red
    Pause; Exit
}

# 2. LIMPEZA TÉCNICA
Write-Host "`n[2/4] Purgando caches e processos (Porta 3000)..." -ForegroundColor Yellow
if (Test-Path "web\.next") { Remove-Item -Path "web\.next" -Recurse -Force -ErrorAction SilentlyContinue }
$conn = Get-NetTCPConnection -LocalPort 3000 -ErrorAction SilentlyContinue
if ($conn) { Stop-Process -Id $conn.OwningProcess -Force }

# 3. DISPARO NEXT.JS
Write-Host "`n[3/4] Disparando motor Webpack..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd web; npm run dev -- --webpack" -WindowStyle Normal

Write-Host "`n[4/4] Sessão iniciada. Terminal operacional." -ForegroundColor Green