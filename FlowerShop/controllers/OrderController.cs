using FlowerShop.models;
using FlowerShop.models.db;
using FlowerShop.models.dto;
using FlowerShop.models.enums;
using FlowerShop.services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;

namespace FlowerShop.controllers
{
    [Route("api/order")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        ApplicationContext db;
        public OrderController(ApplicationContext context)
        {
            db = context;
        }

        [HttpGet]
        public IActionResult Get([FromQuery(Name = "id")] int userId)
        {
            UserDB user = db.User.ToList().FirstOrDefault(
            delegate (UserDB user)
            {
                return user.Id == userId;
            }
            );

            if (user != null)
            {
                List<OrderDB> dbOrders = db.Orders
                        .Include(order => order.User)
                        .Include(order => order.Cart)
                        .Where(
                        delegate (OrderDB orderDB)
                        {
                            return orderDB.Cart.Id == userId;
                        }
                        ).ToList();

                List<Order> result = new List<Order>();

                foreach(OrderDB dbOrder in dbOrders)
                {
                    List<CartItemDB> dbItems = db.CartItem
                        .Include(cartItem => cartItem.Flower)
                        .ThenInclude(flower => flower.Prices)
                        .Include(cartItem => cartItem.Cart)
                        .Where(
                        delegate (CartItemDB cartItemDB)
                        {
                            return cartItemDB.Cart.Id == dbOrder.Cart.Id;
                        }
                        ).ToList();

                    result.Add(OrderService.GetClientOrder(dbOrder, dbItems));
                }

                return Ok(result);
            }

            return BadRequest();
        }

        [HttpPost]
        public IActionResult Post([FromQuery(Name = "id")] int id, [FromBody] Order order)
        {
            UserDB dbUser = db.User.ToList().FirstOrDefault(
            delegate (UserDB user)
            {
                return user.Id == id;
            }
            );

            if (dbUser != null)
            {
                CartDB dbCart = db.Cart.Find(id);

                OrderDB newDatabaseOrder = OrderService.GetDatabaseOrder(order);

                newDatabaseOrder.Status = OrderStatus.PROCESSING;
                newDatabaseOrder.Cart = dbCart;
                newDatabaseOrder.User = dbUser;

                db.Orders.Add(newDatabaseOrder);
                db.SaveChanges();

                order.id = newDatabaseOrder.Id;

                return Ok(order);
            }

            return BadRequest();
        }
    }
}
