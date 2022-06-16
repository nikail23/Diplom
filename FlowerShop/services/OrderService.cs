using FlowerShop.models.db;
using FlowerShop.models.dto;
using System;
using System.Collections.Generic;

namespace FlowerShop.services
{
    public static class OrderService
    {
        public static Order GetClientOrder(OrderDB databaseOrder, List<CartItemDB> dbCartItems)
        {
            if (databaseOrder is not null)
            {
                return new Order()
                {
                    id = databaseOrder.Id,
                    deliveryAddress = databaseOrder.Address,
                    deliveryName = databaseOrder.Name,
                    email = databaseOrder.Email,
                    orderStatus = databaseOrder.Status,
                    paymentType = databaseOrder.PaymentType,
                    phone = databaseOrder.Phone,
                    text = "",
                    productItems = CartService.GetClientItemsArray(dbCartItems),
                };
            }
            return null;
        }

        public static OrderDB GetDatabaseOrder(Order clientOrder)
        {
            if (clientOrder is not null)
            {
                return new OrderDB()
                {
                    Address = clientOrder.deliveryAddress,
                    Name = clientOrder.deliveryName,
                    Email = clientOrder.email,
                    Status = clientOrder.orderStatus,
                    PaymentType = clientOrder.paymentType,
                    Phone = clientOrder.phone,
                };
            }
            return null;
        }
    }
}
