using System.ComponentModel.DataAnnotations;

namespace FlowerShop.models
{
    public class Article
    {
        [Key]
        public int id { get; set; }
        public string date { get; set; }
        public string header { get; set; }
        public string shortParagraph { get; set; }
        public string fullContent { get; set; }
    }
}
