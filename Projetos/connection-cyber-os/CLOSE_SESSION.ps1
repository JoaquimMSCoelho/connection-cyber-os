# -------------------------------------------------------------------------
# PROJETO: CYBER RAFFLE OS (CONNECTION CYBER OS)
# ARQUIVO: E:\Projetos\connection-cyber-os\CLOSE_SESSION.ps1
# OBJETIVO: ENCERRAMENTO E BACKUP FÍSICO COM VALIDAÇÃO DE VOLUME
# -------------------------------------------------------------------------

[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
Clear-Host
Write-Host "==========================================================" -ForegroundColor Red
Write-Host "       ENCERRANDO SESSÃO E EXECUTANDO BACKUP FÍSICO       " -ForegroundColor White -BackgroundColor DarkRed
Write-Host "==========================================================" -ForegroundColor Red

# 1. FINALIZAÇÃO DE PROCESSOS
Write-Host "[1/3] Encerrando instâncias Node.js..." -ForegroundColor Yellow
$NodeProc = Get-Process -Name node -ErrorAction SilentlyContinue
if ($NodeProc) { Stop-Process -Name node -Force; Write-Host "  [OK] Processos finalizados." -ForegroundColor Green }

# 2. PROTOCOLO DE VOLUME (DRIVE J: - BACKUPSYSTEM)
Write-Host "`n[2/3] Autenticando Volume de Backup (Drive J)..." -ForegroundColor Yellow
try {
    $Vol = Get-Volume -DriveLetter J -ErrorAction Stop
    if ($Vol.FileSystemLabel -eq "BACKUPSYSTEM") {
        Write-Host "  [SECURITY] Volume 'BACKUPSYSTEM' autenticado." -ForegroundColor Green
        
        # 3. BACKUP FÍSICO (ROBOCOPY)
        Write-Host "`n[3/3] Iniciando Espelhamento Físico..." -ForegroundColor Yellow
        $Origem = "E:\Projetos\connection-cyber-os"
        $Destino = "J:\Projetos\connection-cyber-os"
        
        ROBOCOPY $Origem $Destino /MIR /XO /FFT /R:2 /W:2 /NFL /NDL /XD "node_modules" ".next" ".git"
        
        if ($LASTEXITCODE -lt 8) {
            Write-Host "  [SUCCESS] Backup concluído e dados seguros no disco." -ForegroundColor Green
        }
    } else {
        Write-Host "  [ERRO] Rótulo do disco J: inválido. Backup abortado." -ForegroundColor Red
    }
} catch {
    Write-Host "  [CRÍTICO] Unidade J: (BACKUPSYSTEM) não encontrada!" -ForegroundColor Red
}