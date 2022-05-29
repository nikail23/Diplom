using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FlowerShop.models.db
{
    public class CartDB
    {
        [ForeignKey("User")]
        public int Id { get; set; }

        public UserDB User { get; set; }
    }
}
