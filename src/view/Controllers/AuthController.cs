using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using PetHome.View.Data.Models;


public class LoginData
{
    [Required]
    [EmailAddress]
    public string Email { get; set; }
    [Required]
    public string Password { get; set; }
}

namespace PetHome.View.Controllers
{
    [Route("api/[controller]")]
    public class AuthController : Controller
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly IConfiguration _config;

        public AuthController(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager, IConfiguration config)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _config = config;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginData login)
        {
            if (ModelState.IsValid)
            {
                var result = await _signInManager.PasswordSignInAsync(login.Email, login.Password, true, lockoutOnFailure: true);

                if (result.Succeeded)
                {
                    var user = await _userManager.FindByEmailAsync(login.Email);

                    var token = CreateJwtToken(user.Id);

                    return Ok(token);
                }
            }
            return BadRequest("Invalid username or password");
        }


        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] LoginData register)
        {
            if (ModelState.IsValid)
            {
                var newUser = new AppUser
                {
                    UserName = register.Email,
                    Email = register.Email
                };

                var result = await _userManager.CreateAsync(newUser, register.Password);

                if (result.Succeeded)
                {
                    return Ok(newUser.Id);
                }
                // We want the error, to help the user say create a password.
                // So we attach them to the ModelState and the BadRequest will contains the errors in the response.
                foreach (var error in result.Errors)
                {
                    ModelState.AddModelError("Errors", error.Description);
                }
            }

            return BadRequest(ModelState);
        }

        private string CreateJwtToken(string userId)
        {
            var signingKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["TokenSecret"]));

            var signingCredentials = new SigningCredentials(signingKey, SecurityAlgorithms.HmacSha256);

            var claims = new Claim[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, userId)
            };

            var jwt = new JwtSecurityToken(claims: claims, signingCredentials: signingCredentials);
            var token = new JwtSecurityTokenHandler().WriteToken(jwt);
            return (token);
        }
    }
}
