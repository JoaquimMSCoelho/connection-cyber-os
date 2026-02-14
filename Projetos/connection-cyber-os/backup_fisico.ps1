# Script de Backup - CyberRaffleOS / ConnectionCyberOS
# Destino: Drive J: (Unidade de Backup Físico)

$source = "E:\Projetos\connection-cyber-os"
$destination = "J:\Projetos\connection-cyber-os"

Write-Host "--- INICIANDO BACKUP DE ALTA FIDELIDADE ---" -ForegroundColor Green

# Executa o Robocopy com espelhamento e preservação de logs
# Exclui node_modules e pastas de build (.next) para otimizar espaço
robocopy $source $destination /MIR /V /S /E /Z /MT:8 /R:5 /W:5 `
    /XD node_modules .next .git `
    /LOG:"$destination\backup_log_$(Get-Date -Format 'yyyyMMdd_HHmm').txt"

Write-Host "--- BACKUP CONCLUÍDO COM SUCESSO NO DRIVE J ---" -ForegroundColor Cyan