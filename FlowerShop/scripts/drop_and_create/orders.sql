USE [FlowerShop]
GO

ALTER TABLE [dbo].[Orders] DROP CONSTRAINT [FK_Orders_User]
GO

ALTER TABLE [dbo].[Orders] DROP CONSTRAINT [FK_Orders_Cart]
GO

/****** Object:  Table [dbo].[Orders]    Script Date: Ñð 04.05.22 17:42:02 ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Orders]') AND type in (N'U'))
DROP TABLE [dbo].[Orders]
GO

/****** Object:  Table [dbo].[Orders]    Script Date: Ñð 04.05.22 17:42:02 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Orders](
	[Id] [int] NOT NULL,
	[Name] [nvarchar](50) NOT NULL,
	[Adress] [nvarchar](100) NOT NULL,
	[CartId] [int] NOT NULL,
	[PaymentType] [int] NOT NULL,
	[Note] [nvarchar](200) NULL,
	[UserId] [int] NOT NULL,
 CONSTRAINT [PK_Orders] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[Orders]  WITH CHECK ADD  CONSTRAINT [FK_Orders_Cart] FOREIGN KEY([CartId])
REFERENCES [dbo].[Cart] ([Id])
GO

ALTER TABLE [dbo].[Orders] CHECK CONSTRAINT [FK_Orders_Cart]
GO

ALTER TABLE [dbo].[Orders]  WITH CHECK ADD  CONSTRAINT [FK_Orders_User] FOREIGN KEY([UserId])
REFERENCES [dbo].[User] ([Id])
GO

ALTER TABLE [dbo].[Orders] CHECK CONSTRAINT [FK_Orders_User]
GO


