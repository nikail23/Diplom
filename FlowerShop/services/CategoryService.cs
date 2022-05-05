using FlowerShop.models;
using FlowerShop.models.db;
using System;
using System.Collections.Generic;

namespace FlowerShop.services
{
    public static class CategoryService
    {
        public static Category GetClientCategory(CategoryDB databaseCategory)
        {
            return new Category()
            {
                id = databaseCategory.Id,
                description = databaseCategory.Description,
                name = databaseCategory.Name,
                photo = databaseCategory.Photo,
                thumbnail = databaseCategory.Thumbnail,
            };
        }

        public static Category[] GetClientCategories(List<CategoryDB> databaseFlowers)
        {
            return databaseFlowers.ConvertAll(new Converter<CategoryDB, Category>(GetClientCategory)).ToArray();
        }

        public static CategoryDB GetDatabaseCategory(Category clientCategory)
        {
            if (clientCategory is not null)
            {
                return new CategoryDB()
                {
                    Name = clientCategory.name,
                    Description = clientCategory.description,
                    Id = clientCategory.id,
                    Photo = clientCategory.photo,
                    Thumbnail = clientCategory.thumbnail,
                };
            }
            return null;
        }
    }
}
