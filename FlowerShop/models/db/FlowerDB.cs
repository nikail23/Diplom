using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace FlowerShop.models.db
{
    public class FlowerDB
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string ShortDescription { get; set; }
        public string Photo { get; set; }
        public bool Thumbnail { get; set; }
        public bool InCart { get; set; }

        public virtual List<PriceDB> Prices { get; set; }
        public virtual CategoryDB Category { get; set; }
    }
}
