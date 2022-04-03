using FlowerShop.models.db;
using FlowerShop.models.dto;
using Microsoft.EntityFrameworkCore;

namespace FlowerShop.models
{
    public class ApplicationContext : DbContext
    {
        public ApplicationContext(DbContextOptions<ApplicationContext> options)
            : base(options)
        {
            Database.EnsureCreated();
        }

        public DbSet<FlowerDB> Flowers => Set<FlowerDB>();
        public DbSet<CategoryDB> Categories => Set<CategoryDB>();
        public DbSet<PriceDB> Prices => Set<PriceDB>();
    }
}