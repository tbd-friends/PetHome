using System.Collections.Generic;
using System.Linq;
using PetHome.Persistence.Models;

namespace PetHome.Persistence
{
    public interface IApplicationContext
    {
        IQueryable<Animal> Animals { get; }

        void Insert<TEntity>(TEntity entity) where TEntity : class;
    }
}