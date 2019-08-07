using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace PetHome.Persistence.Temporary
{
  public class Repository<TEntity> : IRepository<TEntity> where TEntity : class
  {
    protected readonly DbContext Context;

    public Repository(DbContext context)
    {
      Context = context;
    }

    public TEntity Get(Guid id)
    {
      return Context.Set<TEntity>().Find(id);
    }

    public Task<TEntity> GetAsync(Guid id)
    {
      return GetAsync(id, CancellationToken.None);
    }

    public async Task<TEntity> GetAsync(Guid id, CancellationToken cancellationToken)
    {
      return await Context.Set<TEntity>().FindAsync(id, cancellationToken);
    }

    public IEnumerable<TEntity> GetAll()
    {
      return Context.Set<TEntity>().ToList();
    }

    public Task<IEnumerable<TEntity>> GetAllAsync()
    {
      return GetAllAsync(CancellationToken.None);
    }

    public async Task<IEnumerable<TEntity>> GetAllAsync(CancellationToken cancellationToken)
    {
      return await Context.Set<TEntity>().ToListAsync(cancellationToken);
    }

    public IEnumerable<TEntity> Find(Expression<Func<TEntity, bool>> predicate)
    {
      return Context.Set<TEntity>().Where(predicate);
    }

    public Task<IEnumerable<TEntity>> FindAsync(Expression<Func<TEntity, bool>> predicate)
    {
      return FindAsync(predicate, CancellationToken.None);
    }

    public async Task<IEnumerable<TEntity>> FindAsync(Expression<Func<TEntity, bool>> predicate, CancellationToken cancellationToken)
    {
      return await Context.Set<TEntity>().Where(predicate).ToListAsync(cancellationToken);
    }

    public void Add(TEntity entity)
    {
      Context.Set<TEntity>().Add(entity);
    }

    public Task AddAsync(TEntity entity)
    {
      return AddAsync(entity, CancellationToken.None);
    }

    public async Task AddAsync(TEntity entity, CancellationToken cancellationToken)
    {
      await Context.Set<TEntity>().AddAsync(entity, cancellationToken);
    }

    public void AddRange(IEnumerable<TEntity> entities)
    {
      Context.Set<TEntity>().AddRange(entities);
    }

    public Task AddRangeAsync(IEnumerable<TEntity> entities)
    {
      return AddRangeAsync(entities, CancellationToken.None);
    }

    public async Task AddRangeAsync(IEnumerable<TEntity> entities, CancellationToken cancellationToken)
    {
      await Context.Set<TEntity>().AddRangeAsync(entities, cancellationToken);
    }

    public void Remove(TEntity entity)
    {
      Context.Set<TEntity>().Remove(entity);
    }

    public void RemoveRange(IEnumerable<TEntity> entities)
    {
      Context.Set<TEntity>().RemoveRange(entities);
    }
  }
}