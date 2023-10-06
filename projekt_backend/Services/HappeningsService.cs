using Microsoft.AspNetCore.DataProtection.Repositories;
using projekt_backend.DTOs;
using projekt_backend.Models;
using projekt_backend.SQLRepository;

namespace projekt_backend.Services
{
    public class HappeningsService : IHappeningsService
    {
        private readonly ILogger<HappeningsService> _logger;
        private readonly ISQLRepository _sqlRepository;

        public HappeningsService(ILogger<HappeningsService> logger, ISQLRepository sqlRepository)
        {
            _logger = logger;
            _sqlRepository = sqlRepository;
        }

        public void AddHappening(NewHappeningDto happening)
        {
            _logger.LogInformation("[START] Add new happening");
            _sqlRepository.AddUserItem(happening);
            _logger.LogInformation("[DONE] Add new happening");
        }

        public List<Happening> GetAllHappenings()
        {
            _logger.LogInformation("[START] Get all happenings");
            var happenings = _sqlRepository.GetAllItemsFromUser<Happening>();
            _logger.LogInformation("[DONE] Get all happenings");

            return happenings;
        }

        public Happening GetSingleHappening(int id)
        {
            _logger.LogInformation("[START] Get single happening");
            var happening = _sqlRepository.GetSingleItem<Happening>(id);
            _logger.LogInformation("[DONE] Get single happening");

            return happening;
        }

        public void RemoveHappening(int id)
        {
            _logger.LogInformation("[START] Delete happening");
            _sqlRepository.Remove<Happening>(id);
            _logger.LogInformation("[DONE] Delete happening");
        }

        public void UpdateHappening(Happening happening)
        {
            _logger.LogInformation("[START] Update happening");
            _sqlRepository.Update(happening);
            _logger.LogInformation("[DONE] Update happening");
        }
    }
}
