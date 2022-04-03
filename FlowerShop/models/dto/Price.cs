using System.ComponentModel.DataAnnotations;

namespace FlowerShop.models.dto
{
    public class Price
    {
        public int id { get; set; }
        public int price { get; set; }
        public string date { get; set; }
        public int itemId { get; set; }
    }
}
