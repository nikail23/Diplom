USE [FlowerShop]
GO

ALTER TABLE [dbo].[Flowers] DROP CONSTRAINT [FK_Flowers_Categories_CategoryId]
GO

/****** Object:  Table [dbo].[Flowers]    Script Date: Ср 04.05.22 23:12:18 ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Flowers]') AND type in (N'U'))
DROP TABLE [dbo].[Flowers]
GO

/****** Object:  Table [dbo].[Flowers]    Script Date: Ср 04.05.22 23:12:18 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Flowers](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](max) NOT NULL,
	[Description] [nvarchar](max) NOT NULL,
	[ShortDescription] [nvarchar](max) NOT NULL,
	[Photo] [nvarchar](max) NOT NULL,
	[Thumbnail] [bit] NOT NULL,
	[InCart] [bit] NOT NULL,
	[CategoryId] [int] NOT NULL,
 CONSTRAINT [PK_Flowers] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

ALTER TABLE [dbo].[Flowers]  WITH CHECK ADD  CONSTRAINT [FK_Flowers_Categories_CategoryId] FOREIGN KEY([CategoryId])
REFERENCES [dbo].[Categories] ([Id])
GO

ALTER TABLE [dbo].[Flowers] CHECK CONSTRAINT [FK_Flowers_Categories_CategoryId]
GO

