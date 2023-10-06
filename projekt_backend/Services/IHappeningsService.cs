using projekt_backend.DTOs;
using projekt_backend.Models;

namespace projekt_backend.Services
{
    public interface IHappeningsService
    {
        List<Happening> GetAllHappenings();
        Happening GetSingleHappening(int id);
        void AddHappening(NewHappeningDto happenings);
        void UpdateHappening(Happening happening);
        void RemoveHappening(int id);

    }
}
