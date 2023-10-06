using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using projekt_backend.DTOs;
using projekt_backend.Models;
using projekt_backend.Services;
using projekt_backend.SQLRepository;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace projekt_backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IUsersService _usersService;
        private readonly ISQLRepository _sqlRepository;
        private readonly IConfiguration _configuration;
        private readonly ICurrentUserService _currentUserService;

        public AuthController(IUsersService usersService, ISQLRepository sqlRepository, 
            IConfiguration configuration, ICurrentUserService currentUserService)
        {
            _usersService = usersService;
            _sqlRepository = sqlRepository;
            _configuration = configuration;
            _currentUserService = currentUserService;
        }

        private User? AuthenticateUser(LoginDto user)
        {
            var users = _usersService.GetAllUsers();

            var authenticatedUser = users.FirstOrDefault
                (u => u.Username == user.Username && u.Password == HashPassword(user.Password));

            if (authenticatedUser != null)
            {
                return authenticatedUser;
            }
            else
            {
                return null;
            }
        }

        private string GenerateToken(User user)
        {
            var key = Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]);
            var userIdClaim = new Claim("userId", user.Id.ToString());

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Issuer = _configuration["Jwt:Issuer"],
                Audience = _configuration["Jwt:Audience"],
                Expires = DateTime.UtcNow.AddDays(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature),
                Subject = new ClaimsIdentity(new[] { userIdClaim })
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }

        [AllowAnonymous]
        [Route("Login")]
        [HttpPost]

        public IActionResult Login(LoginDto user)
        {
            IActionResult response = Unauthorized();
            var user_ = AuthenticateUser(user);
            if(user_ != null)
            {
                var token = GenerateToken(user_);
                response = Ok(new { token });
            }
            return response;
        }

        [AllowAnonymous]
        [Route("Register")]
        [HttpPost]
        public IActionResult Register(NewUserDto user)
        {
            var users = _usersService.GetAllUsers();
            var passwordHash = HashPassword(user.Password);
            var newUser = new NewUserDto()
            {
                Username= user.Username,
                Password= passwordHash,
            };
            var userExists = users.FirstOrDefault(u => u.Username == user.Username && u.Password == user.Password);

            if (userExists == null)
            {
                _sqlRepository.Add(newUser);
            }

            return Ok(newUser);
        }

        private static string HashPassword(string password)
        {
            using var sha256 = SHA256.Create();
            var hashedBytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
            return BitConverter.ToString(hashedBytes).Replace("-", "").ToLower();
        }

        [Authorize]
        [HttpGet("myid")]
        public IActionResult GetMyId()
        {
            var userId = _currentUserService.GetCurrentUserId();
            if (userId == null) return BadRequest();
            var user = _usersService.GetUserById(userId.Value);
            return Ok(user);
        }

    }
}
