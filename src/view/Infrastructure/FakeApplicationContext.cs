using System.Collections.Generic;
using PetHome.Persistence;

namespace PetHome.View.Infrastructure
{
    public class FakeApplicationContext : IApplicationContext
    {
        private List<object> EntitiesAdded { get; }

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