namespace FlowerShop.models.dto
{
    public class Cart
    {
        public bool finished { get; set; }
        public int id { get; set; }
        public ItemOrder[] orderItems { get; set; }
        public string text { get; set; }
    }
}
