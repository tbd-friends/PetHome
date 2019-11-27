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
    public interface IMigrationRunner
    {
        void Migrate(DbContext context);
    }

    public class MigrationRunner : IMigrationRunner
    {
        public void Migrate(DbContext context)
        {
            context.Database.Migrate();
        }
    }

    public static class SeedData
    {
        public static void EnsureDataSeeded(IServiceProvider serviceProvider)
        {
            var config = serviceProvider.GetRequiredService<IConfiguration>();

            RunMigrations(serviceProvider);
            SeedIdentity(serviceProvider, config);
        }

        private static void RunMigrations(IServiceProvider serviceProvider)
        {
            Console.WriteLine("Running Migrations...");
            using (var scope = serviceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                var identityContext = scope.ServiceProvider.GetService<IdentityContext>();
                var applicationContext = scope.ServiceProvider.GetService<ApplicationContext>();

                var migrationRunner = scope.ServiceProvider.GetRequiredService<IMigrationRunner>();
                migrationRunner.Migrate(identityContext);
                migrationRunner.Migrate(applicationContext);
            }
        }

        private static void SeedIdentity(IServiceProvider serviceProvider, IConfiguration config)
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