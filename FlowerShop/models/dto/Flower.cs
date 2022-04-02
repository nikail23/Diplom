using System.ComponentModel.DataAnnotations;

namespace FlowerShop.models.dto
{
    public class Flower
    {
        //public Category category;
        [Key]
        public int id { get; set; }
        public string name { get; set; }
        public string description { get; set; }
        public string shortDescription { get; set; }
        //public Price priceDto { get; set; }
        public string photo { get; set; }
        public bool thumbnail { get; set; }
        public bool inCart { get; set; }
    }
}
