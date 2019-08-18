using IdentityModel;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using PetHome.Persistence;
using PetHome.View.Data;
using PetHome.View.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace PetHome.View
{
    public class SeedData
    {
        public static void EnsureSeedData(string connectionString)
        {
            var services = new ServiceCollection();

            services.AddDbContext<ApplicationContext>(options =>
                options.UseSqlServer(connectionString));

            services.AddDbContext<IdentityContext>(options =>
                options.UseSqlServer(connectionString));

            services.AddIdentity<ApplicationUser, IdentityRole>()
                .AddEntityFrameworkStores<IdentityContext>()
                .AddDefaultTokenProviders();

            using (var serviceProvider = services.BuildServiceProvider())
            {
                using (var scope = serviceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope())
                {
                    var context = scope.ServiceProvider.GetService<ApplicationContext>();

                    // With this line we don't need to run the migration in the console, 
                    // running the app with /seed will run this migration
                    context.Database.Migrate();
                }

                using (var scope = serviceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope())
                {
                    var context = scope.ServiceProvider.GetService<IdentityContext>();

                    // With this line we don't need to run the migration in the console, 
                    // running the app with /seed will run this migration
                    context.Database.Migrate();

                    var userManager = scope.ServiceProvider.GetRequiredService<UserManager<ApplicationUser>>();
                    var manager = userManager.FindByEmailAsync("manager@pethome.app").Result;
                    if (manager == null)
                    {
                        manager = new ApplicationUser
                        {
                            UserName = "manager@pethome.app"
                        };
                        var result = userManager.CreateAsync(manager, "Home*4!pets").Result;
                        if (!result.Succeeded)
                        {
                            throw new Exception(result.Errors.First().Description);
                        }

                        result = userManager.AddClaimsAsync(manager, new Claim[] {
                            new Claim(JwtClaimTypes.Name, "Manager"),
                            new Claim(JwtClaimTypes.Email, "manager@pethome.app"),
                            new Claim(JwtClaimTypes.EmailVerified, "true", ClaimValueTypes.Boolean)
                        }).Result;

                        if (!result.Succeeded)
                        {
                            throw new Exception(result.Errors.First().Description);
                        }
                        Console.WriteLine("Manager created");
                    }
                    else
                    {
                        Console.WriteLine("Manager already exists");
                    }
                }
            }
        }
    }
}
