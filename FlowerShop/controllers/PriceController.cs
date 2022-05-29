using FlowerShop.models;
using FlowerShop.models.dto;
using FlowerShop.services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace FlowerShop.controllers
{
    [ApiController]
    [Route("api/price")]
    public class PriceController : Controller
    {
        ApplicationContext db;
        public PriceController(ApplicationContext context)
        {
            db = context;
        }

        [HttpGet("{id}")]
        public Price[] Get(int id)
        {
            var databasePrices = db.Prices.Include("Flower").ToList();
            return PriceService.GetPriceHistory(databasePrices, id);
        }
    }
}
