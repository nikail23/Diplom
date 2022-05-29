using System.ComponentModel.DataAnnotations;

namespace FlowerShop.models.db
{
    public class CartItemDB
    {
        [Key]
        public int Id { get; set; }
        public int Count { get; set; }

        public virtual FlowerDB Flower { get; set; }
        public virtual CartDB Cart { get; set; }
    }
}
