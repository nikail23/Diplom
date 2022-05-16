using FlowerShop.models;
using FlowerShop.models.db;
using FlowerShop.models.dto;
using FlowerShop.models.responses;
using FlowerShop.services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;

namespace FlowerShop.controllers
{
    [ApiController]
    [Route("api/items")]
    public class FlowerController : Controller
    {
        ApplicationContext db;
        public FlowerController(ApplicationContext context)
        {
            db = context;
        }

        [HttpGet]
        [Authorize(Roles = "user")]
        public FlowerResponse Get(
            [FromQuery(Name = "direction")] string direction,
            [FromQuery(Name = "sortProperty")] string sortProperty,
            [FromQuery(Name = "minPrice")] float minPrice,
            [FromQuery(Name = "maxPrice")] float maxPrice,
            [FromQuery(Name = "categoryId")] int categoryId,
            [FromQuery(Name = "page")] int page,
            [FromQuery(Name = "size")] int size
            )
        {
            List<FlowerDB> databaseFlowers = db.Flowers
                .Include("Prices")
                .Include("Category")
                .ToList();

            List<Flower> flowers = FlowerService.GetClientFlowersList(databaseFlowers);

            FlowerService.SortFlowers(flowers, direction, sortProperty);
            List<Flower> filteredAndSortedFlowers = FlowerService.FilterFlowers(flowers, minPrice, maxPrice, categoryId);

            int pagesCount;
            List<Flower> currentPage = FlowerService.GetFlowersPage(filteredAndSortedFlowers, size, page, out pagesCount);

            FlowerResponse response = new FlowerResponse()
            {
                flowers = currentPage.ToArray(),
                totalPages = pagesCount,
            };

            return response;
        }

        [HttpGet("{id}")]
        public Flower Get(int id)
        {
            FlowerDB databaseFlower = db.Flowers
                .Include("Prices")
                .Include("Category")
                .FirstOrDefault(x => x.Id == id);
            Flower clientFlower = FlowerService.GetClientFlower(databaseFlower);
            return clientFlower;
        }

        [HttpPost]
        public IActionResult Post(Flower clientFlower)
        {
            if (ModelState.IsValid)
            {
                FlowerDB databaseFlower = FlowerService.GetDatabaseFlower(clientFlower);
                db.Flowers.Add(databaseFlower);
                db.SaveChanges();
                return Ok(clientFlower);
            }
            return BadRequest(ModelState);
        }

        [HttpPut]
        public IActionResult Put(Flower clientFlower)
        {
            if (ModelState.IsValid)
            {
                FlowerDB databaseFlower = FlowerService.GetDatabaseFlower(clientFlower);
                db.Update(databaseFlower);
                db.SaveChanges();
                return Ok(clientFlower);
            }
            return BadRequest(ModelState);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var flower = db.Flowers.FirstOrDefault(x => x.Id == id);
            if (flower != null)
            {
                db.Flowers.Remove(flower);
                db.SaveChanges();
            }
            return Ok(flower);
        }
    }
}
