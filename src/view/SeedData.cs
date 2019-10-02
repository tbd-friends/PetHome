using System;
using System.Linq;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using PetHome.Persistence;
using PetHome.View.Data;
using PetHome.View.Data.Models;

namespace PetHome.View
{
    public class SeedData
    {
        public static void EnsureDataSeeded(IConfiguration config)
        {
            var connectionString = config.GetConnectionString("DefaultConnection");
            var services = SetupDI(connectionString);

            using (var serviceProvider = services.BuildServiceProvider())
            {
                RunMigrations(serviceProvider);
                SeedIdentity(serviceProvider, config);
            }
        }

        private static IServiceCollection SetupDI(string connectionString)
        {
            var services = new ServiceCollection();

            services.AddDbContext<ApplicationContext>(options =>
            {
                options.UseSqlServer(connectionString);
            });

            services.AddDbContext<IdentityContext>(options =>
            {
                options.UseSqlServer(connectionString);
            });

            services.AddIdentity<AppUser, IdentityRole>()
                .AddEntityFrameworkStores<IdentityContext>()
                .AddDefaultTokenProviders();

            return services;
        }

        private static void RunMigrations(ServiceProvider serviceProvider)
        {
            Console.WriteLine("Running Migrations...");
            using (var scope = serviceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                var identityContext = scope.ServiceProvider.GetService<IdentityContext>();
                var applicationContext = scope.ServiceProvider.GetService<ApplicationContext>();

                identityContext.Database.Migrate();
                applicationContext.Database.Migrate();
            }
        }

        private static void SeedIdentity(ServiceProvider serviceProvider, IConfiguration config)
        {
            Console.WriteLine("Seeding Identity...");
            using (var scope = serviceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                var userManager = scope.ServiceProvider.GetRequiredService<UserManager<AppUser>>();

                var manager = userManager.FindByNameAsync("manager@pethome.app").Result;
                if (manager == null)
                {
                    manager = new AppUser
                    {
                        UserName = "manager@pethome.app",
                        Email = "manager@pethome.app"
                    };

                    var result = userManager.CreateAsync(manager, config["Seed:ManagerPw"]).Result;
                    if (!result.Succeeded)
                    {
                        throw new System.Exception(result.Errors.First().Description);
                    }
                }
            }
        }
    }
}