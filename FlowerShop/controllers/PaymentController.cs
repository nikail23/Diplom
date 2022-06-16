using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FlowerShop.controllers
{
    [Route("api/payments/charge")]
    [ApiController]
    public class PaymentController : ControllerBase
    {
        [HttpPost]
        public IActionResult Get()
        {
            return Ok();
        }        
    }
}
