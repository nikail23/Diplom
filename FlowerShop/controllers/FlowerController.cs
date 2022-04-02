using FlowerShop.models;
using FlowerShop.models.dto;
using FlowerShop.models.responses;
using Microsoft.AspNetCore.Mvc;
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
            if (!db.Flowers.Any())
            {
                db.Flowers.Add(
                    new Flower
                    {
                        name = "Flower 1",
                        /*category = {
                            id = 1,
                            name = "Category 1",
                            description = "Description",
                            photo = "",
                            thumbnail = "",
                        },*/
                        description = "Description",
                        /*priceDto =
                        {
                            id = 1,
                            price = 100,
                            date = "",
                            itemId = 1,
                        },*/
                        shortDescription = "Desc",
                        inCart = false,
                        photo = "",
                        thumbnail = false,
                    }
                );

                db.SaveChanges();
            }
        }

        [HttpGet]
        public FlowerResponse Get()
        {
            Flower[] flowers = db.Flowers.ToList().ToArray();
            FlowerResponse response = new FlowerResponse()
            {
                flowers = flowers
            };
            return response;
        }

        [HttpGet("{id}")]
        public Flower Get(int id)
        {
            Flower flower = db.Flowers.FirstOrDefault(x => x.id == id);
            return flower;
        }

        [HttpPost]
        public IActionResult Post(Flower flower)
        {
            if (ModelState.IsValid)
            {
                db.Flowers.Add(flower);
                db.SaveChanges();
                return Ok(flower);
            }
            return BadRequest(ModelState);
        }

        [HttpPut]
        public IActionResult Put(Flower flower)
        {
            if (ModelState.IsValid)
            {
                db.Update(flower);
                db.SaveChanges();
                return Ok(flower);
            }
            return BadRequest(ModelState);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var flower = db.Flowers.FirstOrDefault(x => x.id == id);
            if (flower != null)
            {
                db.Flowers.Remove(flower);
                db.SaveChanges();
            }
            return Ok(flower);
        }
    }
}
