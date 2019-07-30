using System.Collections.Generic;
using System.Linq;
using PetHome.Persistence;
using PetHome.Persistence.Models;

namespace PetHome.View.Infrastructure
{
    public class FakeApplicationContext : IApplicationContext
    {
        private List<object> EntitiesAdded { get; }

        public IQueryable<Animal> Animals => EntitiesAdded.OfType<Animal>().AsQueryable();

        public FakeApplicationContext()
        {
            EntitiesAdded = new List<object>();
        }

        public void Add<TEntity>(TEntity entity)
        {
            EntitiesAdded.Add(entity);
        }
    }
}