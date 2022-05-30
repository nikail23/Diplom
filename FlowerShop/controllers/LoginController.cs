using FlowerShop.models;
using FlowerShop.models.db;
using FlowerShop.models.dto;
using FlowerShop.services;
using Microsoft.AspNetCore.Mvc;
using System.Linq;

namespace FlowerShop.controllers
{

    [Route("api/users/login")]
    [ApiController]
    public class LoginController : Controller
    {
        ApplicationContext db;
        public LoginController(ApplicationContext context)
        {
            db = context;
        }

        [HttpPost]
        public IActionResult Login([FromBody] User user)
        {
            UserDB dbUser = db.User.FirstOrDefault(dbUser => dbUser.Email == user.email && dbUser.Password == user.password);
            if (dbUser != null)
            {
                return Ok(UsersService.GetClientUser(dbUser));
            }

            return StatusCode(404);
        }
    }

}
