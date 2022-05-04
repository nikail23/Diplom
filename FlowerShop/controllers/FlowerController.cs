using FlowerShop.models;
using FlowerShop.models.db;
using FlowerShop.models.dto;
using FlowerShop.models.responses;
using FlowerShop.services;
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
        public FlowerResponse Get()
        {
            List<FlowerDB> databaseFlowers = db.Flowers
                .Include("Price")
                .Include("Category")
                .ToList();
            FlowerResponse response = new FlowerResponse()
            {
                flowers = FlowerService.GetClientFlowers(databaseFlowers)
            };
            return response;
        }

        [HttpGet("{id}")]
        public Flower Get(int id)
        {
            FlowerDB databaseFlower = db.Flowers.FirstOrDefault(x => x.Id == id);
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
