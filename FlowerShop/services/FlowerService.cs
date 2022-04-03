using FlowerShop.models;
using FlowerShop.models.db;
using FlowerShop.models.dto;
using System;
using System.Collections.Generic;

namespace FlowerShop.services
{
    public static class FlowerService
    {
        public static Flower[] GetClientFlowers(List<FlowerDB> databaseFlowers)
        {
            return databaseFlowers.ConvertAll(new Converter<FlowerDB, Flower>(GetClientFlower)).ToArray();
        }

        public static Flower GetClientFlower(FlowerDB databaseFlower)
        {
            return new Flower()
            {
                name = databaseFlower.Name,
                description = databaseFlower.Description,
                id = databaseFlower.Id,
                priceDto = PriceService.GetClientPrice(databaseFlower.Price),
                shortDescription = databaseFlower.ShortDescription,
                inCart = databaseFlower.InCart,
                photo = databaseFlower.Photo,
                thumbnail = databaseFlower.Thumbnail,
                category = CategoryService.GetClientCategory(databaseFlower.Category),
            };
        }

        public static FlowerDB GetDatabaseFlower(Flower clientFlower)
        {
            return new FlowerDB()
            {
                Name = clientFlower.name,
                Description = clientFlower.description,
                ShortDescription = clientFlower.description,
                Id = clientFlower.id,
                InCart = clientFlower.inCart,
                Photo = clientFlower.photo,
                Thumbnail = clientFlower.thumbnail,
                Category = new CategoryDB()
                {
                    Description = clientFlower.category.description,
                    Id = clientFlower.category.id,
                    Name = clientFlower.category.name,
                    Photo = clientFlower.category.photo,
                    Thumbnail = clientFlower.category.thumbnail,
                },
                Price = new PriceDB()
                {
                    Date = clientFlower.priceDto.date,
                    Id = clientFlower.priceDto.id,
                    Price = clientFlower.priceDto.price,
                }
            };
        }
    }
}
