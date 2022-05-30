using FlowerShop.models;
using FlowerShop.models.db;
using FlowerShop.models.dto;
using FlowerShop.services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FlowerShop.controllers
{
    [Route("api/users/change_password")]
    [ApiController]
    public class ChangePassword : ControllerBase
    {
        ApplicationContext db;
        public ChangePassword(ApplicationContext context)
        {
            db = context;
        }

        [HttpPost]
        public IActionResult Post(
            [FromQuery(Name = "id")] int id,
            [FromBody] UpdatePassword updatePassword
            )
        {
            UserDB user = db.User.Find(id);

            if (user != null)
            {
                if (user.Password == updatePassword.oldPassword)
                {
                    user.Password = updatePassword.newPassword;
                    db.User.Update(user);
                    db.SaveChanges();
                    return Ok(UsersService.GetClientUser(user));
                } else
                {
                    return StatusCode(400);
                }
                
            }

            return NotFound();
        }
    }
}
