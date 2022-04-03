using FlowerShop.models;
using FlowerShop.models.db;

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
    }
}
