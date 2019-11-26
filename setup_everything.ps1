# Get script path
$scriptpath = Split-Path $MyInvocation.MyCommand.Path

# Setup docker DB container
invoke-expression "cmd /c start powershell -Command {Set-Location $scriptpath\Backend\DB; .\DB_setup.ps1}"

# Setup API
invoke-expression "cmd /c start powershell -Command {Set-Location $scriptpath\Backend\API; .\API_setup.ps1}"

# Setup webinstance
invoke-expression "cmd /c start powershell -Command {Set-Location $scriptpath\Frontend; .\Web_setup.ps1}"
