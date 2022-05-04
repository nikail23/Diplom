USE [FlowerShop]
GO

ALTER TABLE [dbo].[Prices] DROP CONSTRAINT [FK_Prices_Flowers]
GO

/****** Object:  Table [dbo].[Prices]    Script Date: Ср 04.05.22 23:12:29 ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Prices]') AND type in (N'U'))
DROP TABLE [dbo].[Prices]
GO

/****** Object:  Table [dbo].[Prices]    Script Date: Ср 04.05.22 23:12:29 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Prices](
	[Id] [int] NOT NULL,
	[Price] [int] NOT NULL,
	[Date] [nvarchar](max) NOT NULL,
	[FlowerId] [int] NOT NULL,
 CONSTRAINT [PK_Prices] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

ALTER TABLE [dbo].[Prices]  WITH CHECK ADD  CONSTRAINT [FK_Prices_Flowers] FOREIGN KEY([FlowerId])
REFERENCES [dbo].[Flowers] ([Id])
GO

ALTER TABLE [dbo].[Prices] CHECK CONSTRAINT [FK_Prices_Flowers]
GO

