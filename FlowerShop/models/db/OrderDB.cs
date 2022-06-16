using System.ComponentModel.DataAnnotations;

namespace FlowerShop.models.db
{
    public class OrderDB
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public string PaymentType { get; set; }
        public string Status { get; set; }
        public string Phone { get; set; }
        public string Note { get; set; }
        public string Email { get; set; }
        public int UserId { get; set; }

        public virtual UserDB User { get; set; }
        public virtual CartDB Cart { get; set; }
    }
}
