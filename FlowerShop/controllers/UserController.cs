using FlowerShop.models;
using FlowerShop.models.db;
using FlowerShop.services;
using Microsoft.AspNetCore.Mvc;

namespace FlowerShop.controllers
{
    [Route("api/users/user")]
    [ApiController]
    public class UserController : Controller
    {
        ApplicationContext db;
        public UserController(ApplicationContext context)
        {
            db = context;
        }


        [HttpGet]
        public IActionResult Get([FromQuery(Name = "id")] int id)
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
