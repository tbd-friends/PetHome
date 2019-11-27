using System;
using System.Collections.Generic;

namespace PetHome.Persistence.Repositories.Interfaces
{
    public interface IRepository<T>
        where T : class
    {
        void Add(T entity);
        IEnumerable<T> GetAll();

        T GetById(Guid id);
    }
}