USE [FlowerShop]

/* deleting */
SET IDENTITY_INSERT [dbo].[Flowers] OFF;
SET IDENTITY_INSERT [dbo].[Categories] OFF;
DELETE Prices

SET IDENTITY_INSERT [dbo].[Flowers] ON;
SET IDENTITY_INSERT [dbo].[Categories] OFF;
DELETE Flowers

SET IDENTITY_INSERT [dbo].[Flowers] OFF;
SET IDENTITY_INSERT [dbo].[Categories] ON;
DELETE Categories

/* inserting */
SET IDENTITY_INSERT [dbo].[Flowers] OFF;
SET IDENTITY_INSERT [dbo].[Categories] ON;
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

SET IDENTITY_INSERT [dbo].[Categories] OFF;
SET IDENTITY_INSERT [dbo].[Flowers] ON;
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
				'images/flowers/lifes_peach.png',
				0,
				0,
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
				'images/flowers/smiles_and_sunshine.png',
				0,
				0,
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
				'images/flowers/light_of_my_live.png',
				0,
				0,
				2
			),
			(
				4,
				'Bouquet 117 (21 gerberas)',
				'For several years now, our company has been delighting
				customers with the delivery of flowers and congratulations. 
				We are really proud of the clear and well-coordinated work of our employees 
				and are always confident that your order will be delivered at the right time to 
				the right place.',
				'Short Description',
				'images/flowers/bouquet_117.png',
				0,
				0,
				1
			),
			(
				5,
				'Summer in the Cape',
				'For several years now, our company has been delighting
				customers with the delivery of flowers and congratulations. 
				We are really proud of the clear and well-coordinated work of our employees 
				and are always confident that your order will be delivered at the right time to 
				the right place.',
				'Short Description',
				'images/flowers/summer_in_the_cape.png',
				0,
				0,
				1
			);

INSERT INTO [dbo].[Prices]
           ([Id]
		   ,[Price]
		   ,[Date]
		   ,[FlowerId])
     VALUES
           (
				1,
				60.99,
				'05/04/2022',
				1
			),
			(
				2,
				70.99,
				'05/05/2022',
				1
			),
			(
				3,
				70.99,
				'05/04/2022',
				2
			),
			(
				4,
				110.99,
				'05/04/2022',
				3
			),
			(
				5,
				100.99,
				'05/04/2022',
				4
			),
			(
				6,
				90.99,
				'05/04/2022',
				5
			);