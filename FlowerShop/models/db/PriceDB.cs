using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FlowerShop.models.db
{
    public class PriceDB
    {
        [Key]
        [ForeignKey("Flower")]
        public int Id { get; set; }
        public int Price { get; set; }
        public string Date { get; set; }

        public virtual FlowerDB Flower { get; set; }
    }
}
