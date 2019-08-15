using System.Reflection;
using Microsoft.EntityFrameworkCore;
using PetHome.Persistence.Models;

namespace PetHome.Persistence
{
    public class ApplicationContext : DbContext
    {
        public DbSet<Animal> Animals { get; set; }

        public ApplicationContext(DbContextOptions<ApplicationContext> options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
        }
    }
}