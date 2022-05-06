using FlowerShop.models;
using FlowerShop.models.db;
using FlowerShop.models.dto;
using FlowerShop.models.enums;
using System;
using System.Collections.Generic;

namespace FlowerShop.services
{
    public static class FlowerService
    {
        public static Flower[] GetClientFlowersArray(List<FlowerDB> databaseFlowers)
        {
            return databaseFlowers.ConvertAll(new Converter<FlowerDB, Flower>(GetClientFlower)).ToArray();
        }

        public static List<Flower> GetClientFlowersList(List<FlowerDB> databaseFlowers)
        {
            return databaseFlowers.ConvertAll(new Converter<FlowerDB, Flower>(GetClientFlower));
        }

        public static Flower GetClientFlower(FlowerDB databaseFlower)
        {
            return new Flower()
            {
                name = databaseFlower.Name,
                description = databaseFlower.Description,
                id = databaseFlower.Id,
                priceDto = PriceService.GetLastPrice(databaseFlower),
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
                Prices = new List<PriceDB>()
                {
                    new PriceDB() {
                        Date = clientFlower.priceDto.date,
                        Id = clientFlower.priceDto.id,
                        Price = clientFlower.priceDto.price,
                    },
                }
            };
        }

        public static void SortFlowers(List<Flower> flowers, string direction, string sortProperty)
        {
            flowers.Sort(
                delegate (Flower firstFlower, Flower secondFlower)
                {
                    if (sortProperty == SortProperty.Price)
                    {
                        if (direction == Direction.ASC)
                        {
                            return firstFlower.priceDto.price > secondFlower.priceDto.price ? 1 : -1;
                        }

                        if (direction == Direction.DESC)
                        {
                            return firstFlower.priceDto.price < secondFlower.priceDto.price ? 1 : -1;
                        }
                    }

                    if (sortProperty == SortProperty.Name)
                    {
                        if (direction == Direction.ASC)
                        {
                            return firstFlower.name.CompareTo(secondFlower.name);
                        }

                        if (direction == Direction.DESC)
                        {
                            return secondFlower.name.CompareTo(firstFlower.name);
                        }
                    }

                    return 0;
                }
            );
        }

        public static List<Flower> FilterFlowers(List<Flower> flowers, Single minPrice, Single maxPrice, int categoryId)
        {
            return flowers.FindAll(
                delegate (Flower flower)
                {
                    if (flower.priceDto.price < minPrice)
                    {
                        return false;
                    }

                    if (maxPrice != 0 && flower.priceDto.price > maxPrice)
                    {
                        return false;
                    }

                    if (categoryId != 0 && flower.category.id != categoryId)
                    {
                        return false;
                    }

                    return true;
                }
            );
        }

        public static List<Flower> GetFlowersPage(List<Flower> flowers, int pageSize, int pageNumber, out int pagesCount)
        {
            if (pageSize != 0)
            {
                pagesCount = flowers.Count % pageSize > 0 ? (flowers.Count / pageSize) + 1 : flowers.Count / pageSize;

                var pages = new Dictionary<int, List<Flower>>();

                for (int i = 0; i < pagesCount; i++)
                {
                    if (i == pagesCount - 1)
                    {
                        pages.Add(i, flowers.GetRange(i * pageSize, flowers.Count % pageSize));
                    } else
                    {
                        pages.Add(i, flowers.GetRange(i * pageSize, pageSize));
                    }
                }

                return pages[pageNumber];
            }

            pagesCount = 1;
            return flowers;
        } 
    }
}
