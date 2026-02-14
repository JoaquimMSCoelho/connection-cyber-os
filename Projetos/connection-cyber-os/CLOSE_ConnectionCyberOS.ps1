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

# --- ROTINA DE ATUALIZACAO DE INVENTARIO (IA) ---
Write-Host "Mapeando estrutura para PROJECT_STRUCTURE.md..." -ForegroundColor Cyan
$rootPath = "E:\Projetos\connection-cyber-os"
$output = "$rootPath\PROJECT_STRUCTURE.md"

# Cabecalho simples
"PROJETO: CONNECTION CYBER OS" | Out-File $output -Encoding utf8
"Atualizado em: $(Get-Date)" | Out-File $output -Append -Encoding utf8
"---" | Out-File $output -Append -Encoding utf8

# Geracao da Arvore
Get-ChildItem -Path $rootPath -Recurse | 
    Where-Object { $_.FullName -notmatch "node_modules|\\.next|\\.git|out|dist" } |
    ForEach-Object {
        $depth = ($_.FullName.Replace($rootPath, "").Split('\').Count - 1)
        $indent = ""
        for($i=0; $i -lt $depth; $i++) { $indent += "  " }
        
        $tipo = "FILE: "
        if ($_.PSIsContainer) { $tipo = "DIR: " }
        
        $linha = $indent + $tipo + $_.Name
        $linha | Out-File $output -Append -Encoding utf8
    }

Write-Host "PROJECT_STRUCTURE.md atualizado com sucesso" -ForegroundColor Emerald
# -----------------------------------------------