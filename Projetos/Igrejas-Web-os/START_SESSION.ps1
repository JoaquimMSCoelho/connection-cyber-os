# -------------------------------------------------------------------------
# PROJETO: IGREJAS WEB OS (CONNECTION CYBER OS)
# ARQUIVO: E:\Projetos\Igrejas-Web-os\START_SESSION.ps1
# OBJETIVO: ORQUESTRAÇÃO DE INICIALIZAÇÃO, LIMPEZA DE CACHE E AUDITORIA
# -------------------------------------------------------------------------

Clear-Host
Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "      CONNECTION CYBER OS | IGREJAS WEB OS v1.0           " -ForegroundColor White -BackgroundColor DarkBlue
Write-Host "            INICIANDO SESSÃO DE DESENVOLVIMENTO           " -ForegroundColor Cyan
Write-Host "==========================================================" -ForegroundColor Cyan

# 1. VALIDAÇÃO DE ESTRUTURA
Write-Host "[1/4] Auditando estrutura de pastas (Next.js)..." -ForegroundColor Yellow
if (Test-Path "E:\Projetos\Igrejas-Web-os\web") {
    Write-Host "  [OK] Diretório da aplicação 'web' localizado." -ForegroundColor Green
} else {
    Write-Host "  [CRÍTICO] Diretório 'web' não encontrado!" -ForegroundColor Red
    Pause
    Exit
}

# 2. LIMPEZA DE AMBIENTE (Cache do Next.js)
Write-Host "`n[2/4] Limpando caches de compilação (.next)..." -ForegroundColor Yellow
if (Test-Path "web\.next") { 
    Remove-Item -Path "web\.next" -Recurse -Force -ErrorAction SilentlyContinue
    Write-Host "  [OK] Cache de build (.next) purgado para garantir integridade." -ForegroundColor Green
} else {
    Write-Host "  [INFO] Nenhum cache anterior detectado." -ForegroundColor Gray
}

# 3. VERIFICAÇÃO DE PORTA (3000)
Write-Host "`n[3/4] Verificando integridade da porta 3000..." -ForegroundColor Yellow
$port = 3000
$checkPort = Get-NetTCPConnection -LocalPort $port -ErrorAction SilentlyContinue

if ($checkPort) {
    Write-Host "  [ALERTA] A porta $port já está em uso! Tentando liberar..." -ForegroundColor Red
    try {
        Stop-Process -Id $checkPort.OwningProcess -Force
        Write-Host "  [OK] Porta $port liberada com sucesso." -ForegroundColor Green
    } catch {
        Write-Host "  [ERRO] Não foi possível liberar a porta automaticamente." -ForegroundColor Red
    }
} else {
    Write-Host "  [OK] Porta $port disponível para o Servidor." -ForegroundColor Green
}

# 4. INICIALIZAÇÃO DO SERVIDOR
Write-Host "`n[4/4] Disparando motor Next.js..." -ForegroundColor Yellow

# Inicia o servidor em uma nova janela para deixar este terminal livre
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd web; npm run dev" -WindowStyle Normal

Write-Host "`n==========================================================" -ForegroundColor Cyan
Write-Host "     AMBIENTE PRONTO. PAINEL CARREGANDO EM LOCALHOST:3000 " -ForegroundColor Cyan
Write-Host "==========================================================" -ForegroundColor Cyan