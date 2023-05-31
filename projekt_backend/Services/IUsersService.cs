using projekt_backend.DTOs;
using projekt_backend.Models;

namespace projekt_backend.Services
{
    public interface IUsersService
    {
        List<User> GetAllUsers();
        User GetUserById(int id);
        void AddUser(NewUserDto User);
        void RemoveUser(int id);

    }
}
