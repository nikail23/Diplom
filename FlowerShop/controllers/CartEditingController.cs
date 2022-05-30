using FlowerShop.models;
using FlowerShop.models.db;
using FlowerShop.models.dto;
using FlowerShop.services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;

namespace FlowerShop.controllers
{
    [Route("api/cart/item")]
    [ApiController]
    public class CartEditingController : ControllerBase
    {
        ApplicationContext db;
        public CartEditingController(ApplicationContext context)
        {
            db = context;
        }

        [HttpPost]
        public IActionResult Add([FromBody] ItemOrder item, [FromQuery(Name = "id")] int id)
        {
            CartDB dbCart = db.Cart.Find(id);

            if (dbCart != null)
            {
                FlowerDB flower = db.Flowers.Find(item.itemId);
                if (db.CartItem.Find(item.id) == null && flower != null)
                {
                    db.CartItem.Add(CartService.GetDatabaseItem(item, dbCart, flower));
                    db.SaveChanges();
                    List<CartItemDB> dbItems = db.CartItem
                        .Include(cartItem => cartItem.Flower)
                        .ThenInclude(flower => flower.Prices)
                        .Include(cartItem => cartItem.Cart)
                        .ToList();
                    ItemOrder[] clientItems = CartService.GetClientItemsArray(dbItems);
                    return Ok(CartService.GetClientCart(dbCart, clientItems));
                }
            }

            return BadRequest();
        }

        [HttpDelete]
        public IActionResult Delete([FromQuery(Name = "id")] int id)
        {
            return BadRequest();
        }
    }
}
