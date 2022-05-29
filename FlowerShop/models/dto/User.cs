namespace FlowerShop.models.dto
{
    public class User
    {
        public int? id { get; set; }
        public string firstName { get; set; }
        public string lastName { get; set; }
        public string? password { get; set; }
        public string email { get; set; }
        public string homeAddress { get; set; }
        public string phone { get; set; }
    }
}
