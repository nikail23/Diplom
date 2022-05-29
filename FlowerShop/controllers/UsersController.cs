using FlowerShop.models;
using FlowerShop.models.db;
using FlowerShop.services;
using Microsoft.AspNetCore.Mvc;

namespace FlowerShop.controllers
{
    [Route("api/users/user")]
    [ApiController]
    public class UsersController : Controller
    {
        ApplicationContext db;
        public UsersController(ApplicationContext context)
        {
            db = context;
        }


        [HttpGet("{id}")]
        public IActionResult GetUser(int id)
        {
            UserDB user = db.User.Find(id);

            if (user != null)
            {
                return Ok(UsersService.GetClientUser(user));
            }

            return NotFound();
        }
    }
}
