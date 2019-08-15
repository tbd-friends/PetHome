using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using PetHome.View.Data.Models;
namespace PetHome.View.Data
{
    public class PetHomeContext : IdentityDbContext<AppUser, IdentityRole, string>
    {
        public PetHomeContext(DbContextOptions<PetHomeContext> options) : base (options)
        {

        }
    }
}
