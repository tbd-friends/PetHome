using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using PetHome.Persistence.Repositories.Interfaces;

namespace PetHome.Persistence.Repositories
{
    public class BaseRepository<T> : IRepository<T>
        where T : class
    {
        protected readonly DbContext Context;

        public BaseRepository(DbContext context)
        {
            Context = context;
        }

        public void Add(T entity)
        {
            Context.Set<T>().Add(entity);
        }

        public IEnumerable<T> GetAll()
        {
            return Context.Set<T>().ToList();
        }
    }
}