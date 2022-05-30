using FlowerShop.models.db;
using FlowerShop.models.dto;
using System;
using System.Collections.Generic;
using System.Linq;

namespace FlowerShop.services
{
    public static class CartService
    {
        public static Cart GetClientCart(CartDB databaseCart, ItemOrder[] orderItems)
        {
            return new Cart()
            {
                id = databaseCart.Id,
                text = "",
                finished = false, // check in orders
                orderItems = orderItems,
            };
        }

        public static ItemOrder[] GetClientItemsArray(List<CartItemDB> databaseItems)
        {
            return databaseItems.ConvertAll(new Converter<CartItemDB, ItemOrder>(GetClientItem)).ToArray();
        }

        public static ItemOrder GetClientItem(CartItemDB databaseItem)
        {
            return new ItemOrder()
            {
                id = databaseItem.Id,
                quantity = databaseItem.Count,
                itemId = databaseItem.Flower.Id,
                priceId = databaseItem.Flower.Prices.LastOrDefault().Id,
            };
        }

        public static CartItemDB GetDatabaseItem(ItemOrder item, CartDB cart, FlowerDB flower)
        {
            return new CartItemDB()
            {
                Id = item.id,
                Count = item.quantity,
                Flower = flower,
                Cart = cart,
            };
        }
    }
}
