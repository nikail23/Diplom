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
    [Route("api/categories")]
    public class CategoryController : Controller
    {
        ApplicationContext db;
        public CategoryController(ApplicationContext context)
        {
            db = context;
        }

        [HttpGet]
        public CategoryResponse Get()
        {
            List<CategoryDB> databaseCategories = db.Categories
                .ToList();
            CategoryResponse response = new CategoryResponse()
            {
                content = CategoryService.GetClientCategories(databaseCategories)
            };
            return response;
        }

        [HttpGet("{id}")]
        public Category Get(int id)
        {
            CategoryDB databaseCategory = db.Categories.FirstOrDefault(x => x.Id == id);
            Category clientCategory = CategoryService.GetClientCategory(databaseCategory);
            return clientCategory;
        }

        [HttpPost]
        public IActionResult Post(Category clientCategory)
        {
            if (ModelState.IsValid)
            {
                CategoryDB databaseCategory = CategoryService.GetDatabaseCategory(clientCategory);
                db.Categories.Add(databaseCategory);
                db.SaveChanges();
                return Ok(clientCategory);
            }
            return BadRequest(ModelState);
        }

        [HttpPut]
        public IActionResult Put(Category clientCategory)
        {
            if (ModelState.IsValid)
            {
                CategoryDB databaseCategory = CategoryService.GetDatabaseCategory(clientCategory);
                db.Update(databaseCategory);
                db.SaveChanges();
                return Ok(clientCategory);
            }
            return BadRequest(ModelState);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var category = db.Categories.FirstOrDefault(x => x.Id == id);
            if (category != null)
            {
                db.Categories.Remove(category);
                db.SaveChanges();
            }
            return Ok(category);
        }
    }
}
