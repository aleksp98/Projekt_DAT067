-- This script will create a ciam database

-- Comment out following two lines if you want to rebuild the DB
DROP DATABASE ciam;
GO

-- Create ciam DB
-- IF NOT EXISTS does not seem to work on mssql so will throw warning if DB already exists
CREATE DATABASE ciam;
GO
USE ciam;
GO

-- Create user table
CREATE TABLE users (
	id INT IDENTITY(1,1) PRIMARY KEY,
	email VARCHAR(255) UNIQUE NOT NULL,
	password VARCHAR(255) NOT NULL,
	first_name VARCHAR(255) NOT NULL,
	last_name VARCHAR(255) NOT NULL,
	token VARCHAR(255),
	verified BIT DEFAULT 0
);
GO

-- See if table was created
SELECT * from users;
GO
