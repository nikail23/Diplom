using FlowerShop.models;
using Microsoft.AspNetCore.Mvc;

namespace FlowerShop.controllers
{
    [Route("api/users/tempid")]
    [ApiController]
    public class TempIdController : Controller
    {
        ApplicationContext db;
        public TempIdController(ApplicationContext context)
        {
            db = context;
        }

        [HttpGet]
        public int GetTempId()
        {
            return 11;
        }
    }
}
