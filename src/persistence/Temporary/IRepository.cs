using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading;
using System.Threading.Tasks;

namespace PetHome.Persistence.Temporary
{
  public interface IRepository<TEntity> where TEntity : class
  {
    TEntity Get(Guid id);
    Task<TEntity> GetAsync(Guid id);
    Task<TEntity> GetAsync(Guid id, CancellationToken cancellationToken);

    IEnumerable<TEntity> GetAll();
    Task<IEnumerable<TEntity>> GetAllAsync();
    Task<IEnumerable<TEntity>> GetAllAsync(CancellationToken cancellationToken);

    IEnumerable<TEntity> Find(Expression<Func<TEntity, bool>> predicate);
    Task<IEnumerable<TEntity>> FindAsync(Expression<Func<TEntity, bool>> predicate);
    Task<IEnumerable<TEntity>> FindAsync(Expression<Func<TEntity, bool>> predicate, CancellationToken cancellationToken);

    void Add(TEntity entity);
    Task AddAsync(TEntity entity);
    Task AddAsync(TEntity entity, CancellationToken cancellationToken);

    void AddRange(IEnumerable<TEntity> entities);
    Task AddRangeAsync(IEnumerable<TEntity> entities);
    Task AddRangeAsync(IEnumerable<TEntity> entities, CancellationToken cancellationToken);

    void Remove(TEntity entity);
    void RemoveRange(IEnumerable<TEntity> entities);
  }
}