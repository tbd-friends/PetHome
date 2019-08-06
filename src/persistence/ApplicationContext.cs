using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using Microsoft.EntityFrameworkCore;
using PetHome.Persistence.Models;

namespace PetHome.Persistence
{
    public class ApplicationContext : DbContext, IApplicationContext
    {
        public IQueryable<Animal> Animals => AnimalsCollection;

        public DbSet<Animal> AnimalsCollection { get; set; }

        public ApplicationContext(DbContextOptions<ApplicationContext> options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
        }

        public void Insert<TEntity>(TEntity entity) where TEntity : class
        {
            Set<TEntity>().Add(entity);

            SaveChanges();
        }
    }
}