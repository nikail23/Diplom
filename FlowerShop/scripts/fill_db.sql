USE [FlowerShop]

SET IDENTITY_INSERT [dbo].[Categories] ON;
SET IDENTITY_INSERT [dbo].[Flowers] ON;

SET IDENTITY_INSERT [dbo].[Prices] ON;
GO

DELETE Flowers
DELETE Categories
DELETE Prices
GO

INSERT INTO [dbo].[Categories]
           ([Id]
		   ,[Name]
           ,[Description]
           ,[Photo]
           ,[Thumbnail])
     VALUES
           (
				1,
				'Fresh flowers',
				'from 17,35 eur.',
				'images/categories/fresh_flowers.png',
				0
			),
			(
				2,
				'Indoor plants',
				'from 9,45 eur.',
				'images/categories/indoor_plants.png',
				0
			),
			(
				3,
				'Planting material',
				'more than 500 species',
				'images/categories/planting_material.png',
				0
			),
			(
				4,
				'Floral accessories',
				'more than 500 species',
				'images/categories/floral_accessories.png',
				0
			),
			(
				5,
				'Compositions made of artificial materials...',
				'for home comfort',
				'images/categories/composite_made.png',
				0
			),
			(
				6,
				'Landscape design',
				'for your garden',
				'images/categories/landscape_design.png',
				0
			)
GO

INSERT INTO [dbo].[Prices]
           ([Id]
		   ,[Price]
		   ,[Date]
		   ,[FlowerId])
     VALUES
           (
				1,
				60,
				'04.05.2022',
				1
			),
			(
				2,
				70,
				'04.05.2022',
				2
			),
			(
				3,
				70,
				'04.05.2022',
				3
			);
GO

INSERT INTO [dbo].[Flowers]
           ([Id]
		   ,[Name]
           ,[Description]
           ,[ShortDescription]
           ,[Photo]
           ,[Thumbnail]
           ,[InCart]
           ,[CategoryId])
     VALUES
           (
				1,
				'Life’s Peach',
				'For several years now, our company has been delighting
				customers with the delivery of flowers and congratulations. 
				We are really proud of the clear and well-coordinated work of our employees 
				and are always confident that your order will be delivered at the right time to 
				the right place.',
				'Short Description',
				'',
				0,
				1,
				1
			),
			(
				2,
				'Smiles and Sunshine',
				'For several years now, our company has been delighting
				customers with the delivery of flowers and congratulations. 
				We are really proud of the clear and well-coordinated work of our employees 
				and are always confident that your order will be delivered at the right time to 
				the right place.',
				'Short Description',
				'',
				0,
				1,
				2
			),
			(
				3,
				'Light of my Life',
				'For several years now, our company has been delighting
				customers with the delivery of flowers and congratulations. 
				We are really proud of the clear and well-coordinated work of our employees 
				and are always confident that your order will be delivered at the right time to 
				the right place.',
				'Short Description',
				'',
				0,
				1,
				2
			);
GO

SET IDENTITY_INSERT [dbo].[Categories] OFF;
SET IDENTITY_INSERT [dbo].[Flowers] OFF;

SET IDENTITY_INSERT [dbo].[Prices] OFF;