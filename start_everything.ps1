# Get script path
$scriptpath = Split-Path $MyInvocation.MyCommand.Path

# Start docker DB container
invoke-expression "cmd /c start powershell -Command {Set-Location $scriptpath\Backend\DB; .\start.ps1}"

# Start API
invoke-expression "cmd /c start powershell -Command {Set-Location $scriptpath\Backend\API; .\start.ps1}"

# Start webinstance
invoke-expression "cmd /c start powershell -Command {Set-Location $scriptpath\Frontend; .\start.ps1}"
