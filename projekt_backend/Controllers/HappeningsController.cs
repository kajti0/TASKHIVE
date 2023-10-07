using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using projekt_backend.DTOs;
using projekt_backend.Models;
using projekt_backend.Services;

namespace projekt_backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class HappeningsController : ControllerBase
    {
        private readonly IHappeningsService _happeningsService;

        public HappeningsController(IHappeningsService happeningsService)
        {
            _happeningsService = happeningsService;
        }

        [Route("GetAllHappenings")]
        [HttpGet]
        public IActionResult GetAllHappenings()
        {
            var result = _happeningsService.GetAllHappenings();
            return Ok(result);
        }

        [Route("GetSingleHappening")]
        [HttpPost]
        public IActionResult GetSingleHappening([FromBody] int id)
        {
            var result = _happeningsService.GetSingleHappening(id);
            return Ok(result);
        }

        [Route("RemoveHappening/{id}")]
        [HttpDelete]
        public IActionResult RemoveHappening(int id)
        {
            _happeningsService.RemoveHappening(id);
            return Ok();
        }

        [Route("AddHappening")]
        [HttpPost]
        public IActionResult AddHappening([FromBody] NewHappeningDto newHappening)
        {
            _happeningsService.AddHappening(newHappening);
            return Ok();
        }

        [Route("UpdateHappening")]
        [HttpPut]
        public IActionResult UpdateHappening([FromBody] Happening happening)
        {
            _happeningsService.UpdateHappening(happening);
            return Ok();
        }
    }
}
