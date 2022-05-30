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
        public IActionResult Delete(
            [FromQuery(Name = "itemId")] int itemId,
            [FromQuery(Name = "cartId")] int cartId
            )
        {
            CartDB dbCart = db.Cart.Find(cartId);

            if (dbCart != null)
            {
                FlowerDB flower = db.Flowers.Find(itemId);
                if (db.CartItem.Find(itemId) != null && flower != null)
                {
                    CartItemDB dbItem = db.CartItem
                        .Include(item => item.Flower)
                        .ThenInclude(flower => flower.Prices)
                        .Include(item => item.Cart)
                        .Single(
                        delegate (CartItemDB cartItemDB)
                        {
                            return cartItemDB.Id == itemId;
                        }
                        );
                    db.CartItem.Remove(dbItem);
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
    }
}
