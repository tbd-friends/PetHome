using System.Linq;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace PetHome.View
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var shouldSeed = args.Any(x => x == "/seed");
            if (shouldSeed) args = args.Except(new[] { "/seed" }).ToArray();

            var host = CreateWebHostBuilder(args).Build();

            if (shouldSeed)
            {
                var config = host.Services.GetRequiredService<IConfiguration>();
                SeedData.EnsureDataSeeded(config);
                return;
            }

            host.Run();
        }

        public static IWebHostBuilder CreateWebHostBuilder(string[] args) =>
            WebHost.CreateDefaultBuilder(args)
                .UseStartup<Startup>();
    }
}
