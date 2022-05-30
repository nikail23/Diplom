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
    [Route("api/cart")]
    [ApiController]
    public class CartController : ControllerBase
    {
        ApplicationContext db;
        public CartController(ApplicationContext context)
        {
            db = context;
        }

        [HttpGet]
        public IActionResult Get([FromQuery(Name = "id")] int id)
        {
            UserDB user = db.User.ToList().FirstOrDefault(
                delegate (UserDB user)
                {
                    return user.Id == id;
                }
                );

            if (user != null)
            {
                CartDB dbCart = db.Cart.Find(user.Id);

                if (dbCart != null)
                {
                    List<CartItemDB> dbItems = db.CartItem
                        .Include(cartItem => cartItem.Flower)
                        .ThenInclude(flower => flower.Prices)
                        .Include(cartItem => cartItem.Cart)
                        .Where(
                        delegate (CartItemDB cartItemDB)
                        {
                            return cartItemDB.Cart.Id == dbCart.Id;
                        }
                        ).ToList();

                    return Ok(CartService.GetClientCart(dbCart, CartService.GetClientItemsArray(dbItems)));
                }
            }

            return BadRequest();
        }
    }
}
