using FlowerShop.models.db;
using FlowerShop.models.dto;

namespace FlowerShop.services
{
    public static class PriceService
    {
        public static Price GetClientPrice(PriceDB databasePrice)
        {
            return new Price()
            {
                id = databasePrice.Id,
                price = databasePrice.Price,
                date = databasePrice.Date,
                itemId = databasePrice.Flower.Id,
            };
        }
    }
}
