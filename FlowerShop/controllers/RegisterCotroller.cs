using FlowerShop.models;
using FlowerShop.models.db;
using FlowerShop.models.dto;
using FlowerShop.services;
using Microsoft.AspNetCore.Mvc;
using System.Linq;

namespace FlowerShop.controllers
{
    [Route("api/users/register")]
    [ApiController]
    public class RegisterCotroller : Controller
    {
        ApplicationContext db;
        public RegisterCotroller(ApplicationContext context)
        {
            db = context;
        }

        [HttpPost]
        public IActionResult Register([FromBody] User newUser)
        {
            UserDB newDbUser = UsersService.GetNewDatabaseUser(newUser);

            if (db.User.FirstOrDefault(dbUser => dbUser.Email == newUser.email) == null)
            {
                db.User.Add(newDbUser);
                db.SaveChanges();
                CartDB newDbCart = UsersService.GetNewDatabaseCart(newDbUser);
                newDbCart.User = newDbUser;
                db.Cart.Add(newDbCart);
                db.SaveChanges();
                return Ok(UsersService.GetClientUser(newDbUser));
            }

            return StatusCode(403);
        }
    }
}
