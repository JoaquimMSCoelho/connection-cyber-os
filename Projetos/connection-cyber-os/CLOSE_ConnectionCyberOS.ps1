[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
Clear-Host
Write-Host "==========================================================" -ForegroundColor Red
Write-Host "      ENCERRAMENTO E BACKUP HÍBRIDO (FÍSICO + CLOUD)      " -ForegroundColor White -BackgroundColor DarkRed
Write-Host "==========================================================" -ForegroundColor Red

# 1. FINALIZAÇÃO
Stop-Process -Name node -Force -ErrorAction SilentlyContinue
Write-Host "[1/3] Processos encerrados." -ForegroundColor Green

# 2. BACKUP FÍSICO (DRIVE J:) [cite: 2026-01-28]
if ((Get-Volume -DriveLetter J).FileSystemLabel -eq "BACKUPSYSTEM") {
    Write-Host "`n[2/3] Espelhamento Físico (Drive J)..." -ForegroundColor Yellow
    ROBOCOPY "E:\Projetos\connection-cyber-os" "J:\Projetos\connection-cyber-os" /MIR /XO /FFT /R:2 /W:2 /NFL /NDL /XD "node_modules" ".next" ".git"
}

# 3. BACKUP CLOUD (GITHUB) [cite: 2026-02-13]
Write-Host "`n[3/3] Sincronizando com GitHub..." -ForegroundColor Yellow
git add .
git commit -m "Sessão encerrada em $(Get-Date -Format 'dd/MM/yyyy HH:mm') | Auto-Backup"
git push origin main

Write-Host "`n[OK] Sessão protegida fisicamente e na nuvem." -ForegroundColor Green

# Script de Mapeamento ConnectionCyberOS
# Local: E:\Projetos\connection-cyber-os\GENERATE_STRUCTURE.ps1

$path = "E:\Projetos\connection-cyber-os"
$outputFile = "$path\PROJECT_STRUCTURE.md"

$header = @"
# 🏗️ ESTRUTURA DO PROJETO: CONNECTION CYBER OS
> Última atualização: $(Get-Date -Format "dd/MM/yyyy HH:mm:ss")
> Escopo: Todo o diretório raiz

---
"@

$header | Out-File -FilePath $outputFile -Encoding utf8

# Gera a árvore ignorando pastas de cache e dependências pesadas
Get-ChildItem -Path $path -Recurse | 
    Where-Object { $_.FullName -notmatch "node_modules|\.next|\.git|out" } |
    Select-Object @{Name="RelativePath"; Expression={$_.FullName.Replace($path, "")}} |
    ForEach-Object { " - $($_.RelativePath)" } | 
    Out-File -FilePath $outputFile -Append -Encoding utf8

Write-Host "✅ PROJECT_STRUCTURE.md atualizado com sucesso em $path" -ForegroundColor Emerald