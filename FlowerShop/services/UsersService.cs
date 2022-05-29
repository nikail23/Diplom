using FlowerShop.models.db;
using FlowerShop.models.dto;

namespace FlowerShop.services
{
    public static class UsersService
    {
        public static User GetClientUser(UserDB databaseUser)
        {
            return new User()
            {
                id = databaseUser.Id,
                firstName = databaseUser.FirstName,
                lastName = databaseUser.SecondName,
                email = databaseUser.Email,
                phone = databaseUser.Phone,
                homeAddress = databaseUser.Address,
            };
        }

        public static UserDB GetNewDatabaseUser(User user)
        {
            return new UserDB()
            {
                FirstName = user.firstName,
                SecondName = user.lastName,
                Email = user.email,
                Phone = user.phone,
                Address = user.homeAddress,
                Password = user.password,
            };
        }

        public static CartDB GetNewDatabaseCart(UserDB newDbUser)
        {
            return new CartDB()
            {
                Id = newDbUser.Id,
            };
        }
    }
}
