using FlowerShop.models.db;
using FlowerShop.models.dto;
using System;
using System.Collections.Generic;

namespace FlowerShop.services
{
    public static class PriceService
    {
        public static Price GetClientPrice(PriceDB databasePrice)
        {
            if (databasePrice is not null)
            {
                return new Price()
                {
                    id = databasePrice.Id,
                    price = databasePrice.Price,
                    date = databasePrice.Date,
                    itemId = databasePrice.Flower.Id,
                };
            }
            return null;
        }

        public static Price GetLastPrice(FlowerDB databaseFlower)
        {
            PriceDB lastPriceDB = databaseFlower.Prices.Count > 0 ? databaseFlower.Prices[databaseFlower.Prices.Count - 1] : null;
            return GetClientPrice(lastPriceDB);
        }

        public static Price[] GetPriceHistory(List<PriceDB> databasePrices, int flowerId)
        {
            return databasePrices.ConvertAll(new Converter<PriceDB, Price>(GetClientPrice)).FindAll(
                   delegate (Price price)
                   {
                       return price.itemId == flowerId;
                   }
            ).ToArray();
        }
    }
}
