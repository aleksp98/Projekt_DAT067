-- This script will create a ciam database

-- Comment out following line if you want to rebuild the DB
DROP DATABASE ciam;
-- Create ciam DB
-- IF NOT EXISTS does not seem to work on mssql so will throw warning if DB already exists
CREATE DATABASE ciam;
USE ciam;
GO

-- Create user table
CREATE TABLE users (
	id INT IDENTITY(1,1) PRIMARY KEY,
	email VARCHAR(255) NOT NULL,
	password VARCHAR(255) NOT NULL
);
GO

-- See if table was created
SELECT * from users;