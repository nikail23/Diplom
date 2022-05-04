USE [FlowerShop]
GO

ALTER TABLE [dbo].[CartItem] DROP CONSTRAINT [FK_CartItem_Flowers]
GO

ALTER TABLE [dbo].[CartItem] DROP CONSTRAINT [FK_CartItem_Cart]
GO

/****** Object:  Table [dbo].[CartItem]    Script Date: Ñð 04.05.22 17:39:34 ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[CartItem]') AND type in (N'U'))
DROP TABLE [dbo].[CartItem]
GO

/****** Object:  Table [dbo].[CartItem]    Script Date: Ñð 04.05.22 17:39:34 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[CartItem](
	[Id] [int] NOT NULL,
	[FlowerId] [int] NOT NULL,
	[Count] [int] NOT NULL,
	[CartId] [int] NULL,
 CONSTRAINT [PK_CartItem] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[CartItem]  WITH CHECK ADD  CONSTRAINT [FK_CartItem_Cart] FOREIGN KEY([CartId])
REFERENCES [dbo].[Cart] ([Id])
GO

ALTER TABLE [dbo].[CartItem] CHECK CONSTRAINT [FK_CartItem_Cart]
GO

ALTER TABLE [dbo].[CartItem]  WITH CHECK ADD  CONSTRAINT [FK_CartItem_Flowers] FOREIGN KEY([FlowerId])
REFERENCES [dbo].[Flowers] ([Id])
GO

ALTER TABLE [dbo].[CartItem] CHECK CONSTRAINT [FK_CartItem_Flowers]
GO


