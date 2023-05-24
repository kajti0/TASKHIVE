using DocumentFormat.OpenXml.Spreadsheet;
using projekt_backend.DTOs;
using projekt_backend.Models;
using projekt_backend.SQLRepository;

namespace projekt_backend.Services
{
    public class UsersService : IUsersService
    {
        private readonly ILogger<UsersService> _logger;
        private readonly ISQLRepository _sqlRepository;

        public UsersService(ILogger<UsersService> logger, ISQLRepository sqlRepository)
        {
            _logger = logger;
            _sqlRepository = sqlRepository;
        }

        public void AddUser(NewUserDto user)
        {
            _logger.LogInformation("[START] Add new user");
            _sqlRepository.Add(user);
            _logger.LogInformation("[DONE] Add new user");
        }

        public List<User> GetAllUsers()
        {
            _logger.LogInformation("[START] Get all users");
            var users = _sqlRepository.GetAllItems<User>();
            _logger.LogInformation("[DONE] Get all users");

            return users;
        }

        public User GetUserById(int id)
        {
            _logger.LogInformation("[START] Get single user");
            var user = _sqlRepository.GetSingleItem<User>(id);
            _logger.LogInformation("[DONE] Get single user");

            return user;
        }

        public void RemoveUser(int id)
        {
            _logger.LogInformation("[START] Delete user");
            _sqlRepository.Remove<User>(id);
            _logger.LogInformation("[DONE] Delete user");
        }


    }
}
