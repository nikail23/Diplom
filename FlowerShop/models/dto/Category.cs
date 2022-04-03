using System.ComponentModel.DataAnnotations;

namespace FlowerShop.models
{
    public class Category
    {
        public int id { get; set; }
        public string name { get; set; }
        public string description { get; set; }
        public string thumbnail { get; set; }
        public string photo { get; set; }
    }
}
