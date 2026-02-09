# -------------------------------------------------------------------------
# PROJETO: IGREJAS WEB OS (CONNECTION CYBER OS)
# ARQUIVO: E:\Projetos\Igrejas-Web-os\CLOSE_SESSION.ps1
# OBJETIVO: ENCERRAMENTO, CONTROLE DE VERSÃO E BACKUP FÍSICO (DRIVE J)
# -------------------------------------------------------------------------

Clear-Host
Write-Host "==========================================================" -ForegroundColor Red
Write-Host "      CONNECTION CYBER OS | IGREJAS WEB OS v1.0           " -ForegroundColor White -BackgroundColor DarkRed
Write-Host "       ENCERRANDO SESSÃO E EXECUTANDO BACKUP DUPLO        " -ForegroundColor Red
Write-Host "==========================================================" -ForegroundColor Red

# 1. ENCERRAMENTO DE PROCESSOS
Write-Host "[1/4] Finalizando processos ativos (Node.js)..." -ForegroundColor Yellow
$NodeProcesses = Get-Process -Name node -ErrorAction SilentlyContinue
if ($NodeProcesses) {
    Stop-Process -Name node -Force
    Write-Host "  [OK] Todos os processos Node.js foram encerrados." -ForegroundColor Green
} else {
    Write-Host "  [OK] Nenhum processo de servidor ativo encontrado." -ForegroundColor Gray
}

# 2. AUDITORIA DE TAMANHO
Write-Host "`n[2/4] Calculando volumetria do projeto..." -ForegroundColor Yellow
$Size = (Get-ChildItem -Recurse | Measure-Object -Property Length -Sum).Sum / 1MB
$FormattedSize = "{0:N2}" -f $Size
Write-Host "  [INFO] Tamanho total atual: $FormattedSize MB" -ForegroundColor Cyan

# 3. BACKUP DE NUVEM (GITHUB)
Write-Host "`n[3/4] Iniciando sincronização com GitHub..." -ForegroundColor Yellow
$Status = git status --porcelain
if ($Status) {
    $Date = Get-Date -Format "dd/MM/yyyy HH:mm"
    Write-Host "  [GIT] Alterações detectadas. Criando ponto de restauração..." -ForegroundColor Cyan
    git add .
    git commit -m "Session Closed: $Date - Auto-Backup IgrejasWebOS"
    
    Write-Host "  [GIT] Enviando para nuvem..." -ForegroundColor Cyan
    git push origin main
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "  [SUCCESS] Código sincronizado com GitHub." -ForegroundColor Green
    } else {
        Write-Host "  [FALHA] Erro ao conectar com GitHub. Verifique a internet." -ForegroundColor Red
    }
} else {
    Write-Host "  [OK] Nenhuma alteração de código pendente." -ForegroundColor Gray
}

# 4. BACKUP FÍSICO (DRIVE J: - ROBOCOPY)
Write-Host "`n[4/4] Iniciando Espelhamento Físico para Drive J: (BACKUP)..." -ForegroundColor Yellow
$Origem  = "E:\Projetos\Igrejas-Web-os"
$Destino = "J:\Projetos\Igrejas-Web-os"

if (Test-Path "J:\") {
    # /MIR: Espelha a árvore de diretórios (Cuidado: deleta no destino o que não existe na origem)
    # /XO: Exclui arquivos mais antigos (ganho de tempo)
    # /XD: Exclui pastas pesadas/inúteis para backup físico (.next, node_modules, .git)
    Write-Host "  [COPY] Espelhando E: para J: (Excluindo node_modules/cache)..." -ForegroundColor Cyan
    
    ROBOCOPY $Origem $Destino /MIR /XO /R:2 /W:2 /NFL /NDL /XD "node_modules" ".next" ".git"
    
    if ($LASTEXITCODE -lt 8) {
        Write-Host "  [SUCCESS] Backup Físico Concluído no Volume BACKUP (J:)." -ForegroundColor Green
    } else {
        Write-Host "  [ALERTA] Robocopy finalizou com erros. Verifique o drive J:." -ForegroundColor Red
    }
} else {
    Write-Host "  [ERRO CRÍTICO] Drive J: (BACKUP) não encontrado! Conecte o disco." -ForegroundColor Red
}

Write-Host "`n==========================================================" -ForegroundColor Red
Write-Host "     SESSÃO ENCERRADA. DADOS SEGUROS NA NUVEM E NO DISCO. " -ForegroundColor Red
Write-Host "==========================================================" -ForegroundColor Red