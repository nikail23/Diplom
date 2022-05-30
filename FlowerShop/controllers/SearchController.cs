using FlowerShop.models;
using FlowerShop.models.db;
using FlowerShop.models.dto;
using FlowerShop.models.responses;
using FlowerShop.services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;

namespace FlowerShop.controllers
{
    [Route("api/items/search")]
    [ApiController]
    public class SearchController : ControllerBase
    {
        ApplicationContext db;
        public SearchController(ApplicationContext context)
        {
            db = context;
        }

        [HttpGet]
        public FlowerResponse Get(
            [FromQuery(Name = "name")] string name
            )
        {
            List<FlowerDB> databaseFlowers = db.Flowers
                .Include("Prices")
                .Include("Category")
                .ToList();

            List<Flower> flowers = FlowerService.GetClientFlowersList(databaseFlowers);

            flowers = FlowerService.Search(flowers, name);

            FlowerResponse response = new FlowerResponse()
            {
                flowers = flowers.ToArray(),
            };

            return response;
        }
    }
}
