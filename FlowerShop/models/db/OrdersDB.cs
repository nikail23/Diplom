using System.ComponentModel.DataAnnotations;

namespace FlowerShop.models.db
{
    public class OrdersDB
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public int PaymentType { get; set; }
        public string Note { get; set; }
        public int UserId { get; set; }

        public virtual UserDB User { get; set; }
        public virtual CartDB Cart { get; set; }
    }
}
