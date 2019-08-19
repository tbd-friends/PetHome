using IdentityModel;
using IdentityServer4.EntityFramework.DbContexts;
using IdentityServer4.EntityFramework.Interfaces;
using IdentityServer4.EntityFramework.Mappers;
using IdentityServer4.EntityFramework.Storage;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using PetHome.Persistence;
using PetHome.View.Data;
using PetHome.View.Data.Models;
using PetHome.View.IdentityServer.Configuration;
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

            services.AddOperationalDbContext(options =>
            {
                options.ConfigureDbContext = db => db.UseSqlServer(connectionString, sql =>
                    sql.MigrationsAssembly(typeof(SeedData).Assembly.FullName));
            });

            services.AddConfigurationDbContext(options =>
            {
                options.ConfigureDbContext = db => db.UseSqlServer(connectionString, sql =>
                    sql.MigrationsAssembly(typeof(SeedData).Assembly.FullName));
            });

            using (var serviceProvider = services.BuildServiceProvider())
            {
                // Migrate IdentityContext
                using (var scope = serviceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope())
                {
                    var context = scope.ServiceProvider.GetService<IdentityContext>();

                    // With this line we don't need to run the migration in the console, 
                    // running the app with /seed will run this migration
                    context.Database.Migrate();

                    var userManager = scope.ServiceProvider.GetRequiredService<UserManager<ApplicationUser>>();
                    var manager = userManager.FindByNameAsync("manager@pethome.app").Result;
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

                // Migrate IdentityServer Contexts
                using (var scope = serviceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope())
                {
                    scope.ServiceProvider.GetService<PersistedGrantDbContext>().Database.Migrate();

                    var context = scope.ServiceProvider.GetService<ConfigurationDbContext>();
                    context.Database.Migrate();
                    EnsureSeedData(context);
                }

                // Migrate ApplicationDbContext
                using (var scope = serviceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope())
                {
                    var context = scope.ServiceProvider.GetService<ApplicationContext>();

                    // With this line we don't need to run the migration in the console, 
                    // running the app with /seed will run this migration
                    context.Database.Migrate();
                }
            }
        }

        private static void EnsureSeedData(IConfigurationDbContext context)
        {
            Console.WriteLine("Seeding IdentitySerer4 database...");
            if (!context.Clients.Any())
            {
                Console.WriteLine("Clients being populated");
                foreach (var client in IdentityServerConfiguration.GetClients())
                {
                    context.Clients.Add(client.ToEntity());
                }
                context.SaveChanges();
            }
            else
            {
                Console.WriteLine("Clients already populated");
            }

            if (!context.IdentityResources.Any())
            {
                Console.WriteLine("IdentityResources being populated");
                foreach (var resource in IdentityServerConfiguration.GetIdentityResources())
                {
                    context.IdentityResources.Add(resource.ToEntity());
                }
                context.SaveChanges();
            }
            else
            {
                Console.WriteLine("IdentityResources already populated");
            }

            if (!context.ApiResources.Any())
            {
                Console.WriteLine("ApiResources being populated");
                foreach (var resource in IdentityServerConfiguration.GetApis())
                {
                    context.ApiResources.Add(resource.ToEntity());
                }
                context.SaveChanges();
            }
            else
            {
                Console.WriteLine("ApiResources already populated");
            }
            Console.WriteLine("Done seeding IdentityServer4 database.");
            Console.WriteLine();
        }
    }
}
