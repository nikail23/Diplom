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

        public DbSet<Flower> Flowers => Set<Flower>();
    }
}