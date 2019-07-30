using System.Linq;
using PetHome.Persistence.Models;

namespace PetHome.Persistence
{
    public interface IApplicationContext
    {
        IQueryable<Animal> Animals { get; }

        void Add<TEntity>(TEntity entity);
    }
}