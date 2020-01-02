-- This script will create a ciam database

-- Comment out following two lines if you want to rebuild the DB
DROP DATABASE ciam;
GO
DROP DATABASE language;
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
	phone_number VARCHAR(20),
	language VARCHAR(50),
	token VARCHAR(255),
	created_at DATETIME2(0) NOT NULL
                DEFAULT CURRENT_TIMESTAMP, 
	verified BIT DEFAULT 0,
	resended_mail BIT DEFAULT 0,
);
GO

-- Create social user table
CREATE TABLE social_users (
	id INT IDENTITY(1,1) PRIMARY KEY,
	email VARCHAR(255) NOT NULL,
	first_name VARCHAR(255) NOT NULL,
	last_name VARCHAR(255) NOT NULL,
	phone_number VARCHAR(20),
	language VARCHAR(50),
	created_at DATETIME2(0) NOT NULL
                DEFAULT CURRENT_TIMESTAMP, 
	social_platform VARCHAR(255),
	social_id VARCHAR(255),
	CONSTRAINT social UNIQUE (social_platform, social_id)
);
GO

-- Create language DB
CREATE DATABASE language;
GO
USE language;
GO

-- Create text table
CREATE TABLE text (
	id INT IDENTITY(1,1) PRIMARY KEY,
	text VARCHAR(100) UNIQUE NOT NULL,
);
GO



CREATE DATABASE [TranslateDB]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'TranslateDB', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL13.SQLEXPRESS\MSSQL\DATA\TranslateDB.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'TranslateDB_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL13.SQLEXPRESS\MSSQL\DATA\TranslateDB_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
GO
ALTER DATABASE [TranslateDB] SET COMPATIBILITY_LEVEL = 130
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [TranslateDB].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [TranslateDB] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [TranslateDB] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [TranslateDB] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [TranslateDB] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [TranslateDB] SET ARITHABORT OFF 
GO
ALTER DATABASE [TranslateDB] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [TranslateDB] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [TranslateDB] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [TranslateDB] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [TranslateDB] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [TranslateDB] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [TranslateDB] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [TranslateDB] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [TranslateDB] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [TranslateDB] SET  DISABLE_BROKER 
GO
ALTER DATABASE [TranslateDB] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [TranslateDB] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [TranslateDB] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [TranslateDB] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [TranslateDB] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [TranslateDB] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [TranslateDB] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [TranslateDB] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [TranslateDB] SET  MULTI_USER 
GO
ALTER DATABASE [TranslateDB] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [TranslateDB] SET DB_CHAINING OFF 
GO
ALTER DATABASE [TranslateDB] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [TranslateDB] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [TranslateDB] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [TranslateDB] SET QUERY_STORE = OFF
GO
USE [TranslateDB]
GO
ALTER DATABASE SCOPED CONFIGURATION SET MAXDOP = 0;
GO
ALTER DATABASE SCOPED CONFIGURATION FOR SECONDARY SET MAXDOP = PRIMARY;
GO
ALTER DATABASE SCOPED CONFIGURATION SET LEGACY_CARDINALITY_ESTIMATION = OFF;
GO
ALTER DATABASE SCOPED CONFIGURATION FOR SECONDARY SET LEGACY_CARDINALITY_ESTIMATION = PRIMARY;
GO
ALTER DATABASE SCOPED CONFIGURATION SET PARAMETER_SNIFFING = ON;
GO
ALTER DATABASE SCOPED CONFIGURATION FOR SECONDARY SET PARAMETER_SNIFFING = PRIMARY;
GO
ALTER DATABASE SCOPED CONFIGURATION SET QUERY_OPTIMIZER_HOTFIXES = OFF;
GO
ALTER DATABASE SCOPED CONFIGURATION FOR SECONDARY SET QUERY_OPTIMIZER_HOTFIXES = PRIMARY;
GO
USE [TranslateDB]
GO
/****** Object:  Table [dbo].[Text]    Script Date: 2019-11-18 12:36:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Text](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Text] [nvarchar](500) NOT NULL,
	[Comment] [nvarchar](500) NULL,
	[CreateDate] [datetime] NULL,
	[ModifyDate] [datetime] NULL,
 CONSTRAINT [PK_TranslateText] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Collection]    Script Date: 2019-11-18 12:36:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Collection](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](50) NULL,
	[Description] [nvarchar](500) NULL,
	[Createdate] [datetime] NULL,
	[Modifydate] [datetime] NULL,
 CONSTRAINT [PK_TranslationCollection] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Collection_Text]    Script Date: 2019-11-18 12:36:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Collection_Text](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[TextID] [int] NULL,
	[CollectionID] [int] NULL,
	[Createdate] [datetime] NULL,
 CONSTRAINT [PK_Collection_Text] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  View [dbo].[vCollectionText]    Script Date: 2019-11-18 12:36:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE VIEW [dbo].[vCollectionText]
AS
SELECT        dbo.Collection.Name, dbo.Collection_Text.TextID, dbo.Collection_Text.CollectionID, dbo.Text.Text
FROM            dbo.Collection_Text INNER JOIN
                         dbo.Text ON dbo.Collection_Text.TextID = dbo.Text.ID INNER JOIN
                         dbo.Collection ON dbo.Collection_Text.CollectionID = dbo.Collection.ID

GO
/****** Object:  Table [dbo].[Language]    Script Date: 2019-11-18 12:36:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Language](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[LanguageShort] [nvarchar](4) NULL,
	[Language] [nvarchar](50) NULL,
	[CountryShort] [nvarchar](2) NULL,
	[Country] [nvarchar](100) NULL,
	[Createdate] [datetime] NULL,
	[Modifydate] [datetime] NULL,
 CONSTRAINT [PK_Language] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Language_Text]    Script Date: 2019-11-18 12:36:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Language_Text](
	[ID] [bigint] IDENTITY(1,1) NOT NULL,
	[LanguageID] [int] NULL,
	[TextID] [int] NULL,
	[LanguageText] [nvarchar](500) NULL,
	[Createdate] [datetime] NULL,
	[Modifydate] [datetime] NULL,
 CONSTRAINT [PK_TranslationLangText] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  View [dbo].[vLanguageText]    Script Date: 2019-11-18 12:36:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE VIEW [dbo].[vLanguageText]
AS
SELECT        dbo.Language_Text.LanguageID, dbo.Language_Text.TextID, dbo.Language_Text.LanguageText, dbo.Language.LanguageShort, dbo.Language.Language, dbo.Language.CountryShort, dbo.Language.Country, 
                         dbo.Text.Text
FROM            dbo.Language_Text INNER JOIN
                         dbo.Language ON dbo.Language_Text.LanguageID = dbo.Language.ID INNER JOIN
                         dbo.Text ON dbo.Language_Text.TextID = dbo.Text.ID

GO
/****** Object:  Index [IX_Collection_Text]    Script Date: 2019-11-18 12:36:24 ******/
CREATE UNIQUE NONCLUSTERED INDEX [IX_Collection_Text] ON [dbo].[Collection_Text]
(
	[CollectionID] ASC,
	[TextID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [IX_Language_Text]    Script Date: 2019-11-18 12:36:24 ******/
CREATE UNIQUE NONCLUSTERED INDEX [IX_Language_Text] ON [dbo].[Language_Text]
(
	[LanguageID] ASC,
	[TextID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [unique_TEXT]    Script Date: 2019-11-18 12:36:24 ******/
CREATE UNIQUE NONCLUSTERED INDEX [unique_TEXT] ON [dbo].[Text]
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Collection] ADD  CONSTRAINT [DF_Collection_Createdate]  DEFAULT (getdate()) FOR [Createdate]
GO
ALTER TABLE [dbo].[Collection_Text] ADD  CONSTRAINT [DF_Collection_Text_Createdate]  DEFAULT (getdate()) FOR [Createdate]
GO
ALTER TABLE [dbo].[Language] ADD  CONSTRAINT [DF_Language_Createdate]  DEFAULT (getdate()) FOR [Createdate]
GO
ALTER TABLE [dbo].[Language_Text] ADD  CONSTRAINT [DF_Language_Text_Createdate]  DEFAULT (getdate()) FOR [Createdate]
GO
USE [master]
GO
ALTER DATABASE [TranslateDB] SET  READ_WRITE 
GO


