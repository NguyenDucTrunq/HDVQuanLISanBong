using UserService.Data;
using UserService.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using UserService.Models;

[Route("api/[controller]")]
[ApiController]
public class UsersController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly string _jwtSecret;

    public UsersController(AppDbContext context, IConfiguration configuration)
    {
        _context = context;
        _jwtSecret = configuration["Jwt:Secret"];
    }

    // GET: api/Users
    [HttpGet]
    [Authorize(Roles = "ADMIN")]
    public async Task<ActionResult<IEnumerable<User>>> GetUsers()
    {
        return await _context.Users.ToListAsync();
    }

    // POST: api/Users/login
    [HttpPost("login")]
    public IActionResult Login([FromBody] User user)
    {
        if (user.Username == null || user.Password == null)
        {
            return BadRequest("Tên đăng nhập và mật khẩu không được để trống.");
        }

        var dbUser = _context.Users.SingleOrDefault(u => u.Username == user.Username);
        if (dbUser == null)
        {
            return Unauthorized("Tài khoản không tồn tại.");
        }

        // Kiểm tra mật khẩu đã băm
        if (!VerifyPasswordHash(user.Password, dbUser.Password))
        {
            return Unauthorized("Sai mật khẩu.");
        }

        // Tạo token với Claims Role
        var tokenHandler = new JwtSecurityTokenHandler();
        var key = Encoding.UTF8.GetBytes(_jwtSecret);
        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(new[]
             {
                new Claim(ClaimTypes.Name, dbUser.Id.ToString()),
                new Claim(ClaimTypes.Role, dbUser.Role)
            }),
            Expires = DateTime.UtcNow.AddHours(1),
            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature),
            Issuer = "https://localhost:5100",
            Audience = "footballfield"
        };


        var token = tokenHandler.CreateToken(tokenDescriptor);
        var role = user.Role;
        _context.SaveChanges();

        return Ok(new { Token = tokenHandler.WriteToken(token), role = dbUser.Role });
    }

    // POST: api/Users/register
    [HttpPost("register")]
    
    public IActionResult Register([FromBody] User user)
    {
        if (_context.Users.Any(u => u.Username == user.Username))
        {
            return BadRequest("Tên đăng nhập đã tồn tại.");
        }

        user.Password = HashPassword(user.Password);
        user.Enabled = false;

        // Gán role mặc định nếu không có
        if (string.IsNullOrEmpty(user.Role) || !(user.Role == "USER" || user.Role == "USER"))
        {
            user.Role = "USER"; // Hoặc "Admin" tùy theo yêu cầu
        }

        _context.Users.Add(user);
        _context.SaveChanges();

        return Ok("Đăng ký tài khoản thành công.");
    }



    // PUT: api/Users/activate/5
    [HttpPut("activate/{id}")]
    
    public IActionResult ActivateAccount(int id)
    {
        var user = _context.Users.Find(id);
        if (user == null)
        {
            return NotFound("Không tìm thấy người dùng.");
        }

        if (user.Enabled)
        {
            return BadRequest("Tài khoản đã được kích hoạt.");
        }

        user.Enabled = true;
        _context.SaveChanges();

        return Ok("Tài khoản đã được kích hoạt thành công.");
    }

    
    private bool VerifyPasswordHash(string password, string storedHash)
    {
        using (var sha256 = SHA256.Create())
        {
            var hashedBytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
            var hashedPassword = Convert.ToBase64String(hashedBytes);
            return hashedPassword == storedHash;
        }
    }

    // Hàm băm mật khẩu khi đăng ký
    private string HashPassword(string password)
    {
        using (var sha256 = SHA256.Create())
        {
            var hashedBytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
            return Convert.ToBase64String(hashedBytes);
        }
    }
}