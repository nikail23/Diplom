using FlowerShop.models.db;
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
        public DbSet<UserDB> User => Set<UserDB>();
        public DbSet<OrdersDB> Orders => Set<OrdersDB>();
        public DbSet<CartItemDB> CartItem => Set<CartItemDB>();
        public DbSet<CartDB> Cart => Set<CartDB>();
    }
}