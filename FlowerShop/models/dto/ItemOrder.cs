namespace FlowerShop.models.dto
{
    public class ItemOrder
    {
        public int id { get; set; }
        public int itemId { get; set; }
        public int priceId { get; set; }
        public int quantity { get; set; }
    }
}
