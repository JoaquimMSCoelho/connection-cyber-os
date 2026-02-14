[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
Clear-Host
Write-Host ">>> CHECK DE INTEGRIDADE PRÉ-BACKUP <<<" -ForegroundColor Cyan

Set-Location -Path "web"
Write-Host "`n[1/2] Executando Type-Check (tsc)..." -ForegroundColor Yellow
npm run type-check

if ($LASTEXITCODE -eq 0) {
    Write-Host "  [SUCCESS] Tipagem íntegra." -ForegroundColor Green
    Write-Host "`n[2/2] Executando Next Lint..." -ForegroundColor Yellow
    npm run lint
} else {
    Write-Host "  [FALHA] Erros de tipo detectados!" -ForegroundColor Red
}
Set-Location -Path ".."