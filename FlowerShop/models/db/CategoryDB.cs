using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace FlowerShop.models.db
{
    public class CategoryDB
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Thumbnail { get; set; }
        public string Photo { get; set; }


        public virtual List<FlowerDB> Flowers { get; set; }
    }
}
