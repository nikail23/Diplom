namespace FlowerShop.models.dto
{
    public class Order
    {
        public string deliveryAddress { get; set; }
        public string deliveryName { get; set; }
        public string email { get; set; }
        public int id { get; set; }
        public string orderStatus { get; set; }
        public string paymentType { get; set; }
        public string phone { get; set; } 
        public ItemOrder[] productItems { get; set; }
        public string text { get; set; }
    }
}
