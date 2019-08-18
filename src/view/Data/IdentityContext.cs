using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using PetHome.View.Data.Models;
namespace PetHome.View.Data
{
    public class IdentityContext : IdentityDbContext<AppUser, IdentityRole, string>
    {
        public IdentityContext(DbContextOptions<IdentityContext> options) : base (options)
        {
            
        }
    }
}
