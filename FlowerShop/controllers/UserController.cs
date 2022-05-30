using FlowerShop.models;
using FlowerShop.models.db;
using FlowerShop.models.dto;
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

        [HttpPost]
        public IActionResult Post(
            [FromQuery(Name = "id")] int id,
            [FromBody] User updateUser
            )
        {
            UserDB user = db.User.Find(id);

            if (user != null)
            {
                user.Address = updateUser.homeAddress;
                user.Phone = updateUser.phone; 
                user.Email = updateUser.email;
                user.FirstName = updateUser.firstName;
                user.SecondName = updateUser.lastName;

                db.User.Update(user);
                db.SaveChanges();
                return Ok(UsersService.GetClientUser(user));
            }

            return NotFound();
        }
    }
}
