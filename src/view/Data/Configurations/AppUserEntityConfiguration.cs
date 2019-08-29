using System;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.Extensions.Configuration;
using PetHome.View.Data.Models;

namespace PetHome.View.Data.Configurations
{
    public class AppUserEntityConfiguration : IEntityTypeConfiguration<AppUser>
    {
        private readonly IConfiguration _configuration;

        public AppUserEntityConfiguration(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public void Configure(EntityTypeBuilder<AppUser> builder)
        {
            var user = new AppUser
            {
                Email = "manager@pethome.app",
                NormalizedEmail = "MANAGER@PETHOME.APP",
                UserName = "manager@pethome.app",
                NormalizedUserName = "MANAGER@PETHOME.APP",
                LockoutEnabled = true,
                EmailConfirmed = true,
                SecurityStamp = $"{Guid.NewGuid()}"
            };

            var hasher = new PasswordHasher<AppUser>();

            user.PasswordHash = hasher.HashPassword(user, _configuration["Seed:ManagerPw"]);

            builder.HasData(user);
        }
    }
}