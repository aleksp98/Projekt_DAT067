# This script will create the mssql docker container on local machine and run the DB.sql script to create the database table

# Create a mssql Docker container (will faila and continue if it already exists)
docker run -e "ACCEPT_EULA=Y" -e "SA_PASSWORD=Password!" -p 1433:1433 -d --name mssql mcr.microsoft.com/mssql/server:2017-latest
# Start mssql docker container
docker start mssql
# Show running containers
docker ps -a

# Get script path
$scriptpath = Split-Path $MyInvocation.MyCommand.Path
# Copy DB file to container
docker cp "$scriptpath\DB.sql" mssql:/DB.sql
# Use sqlcmd to connect to mssql container and run database script
docker exec -it mssql /opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P Password! -i "DB.sql"
