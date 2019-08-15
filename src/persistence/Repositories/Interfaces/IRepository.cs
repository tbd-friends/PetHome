namespace PetHome.Persistence.Repositories.Interfaces
{
    public interface IRepository<in T>
        where T : class
    {
        void Add(T entity);
    }
}