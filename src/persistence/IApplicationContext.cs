namespace PetHome.Persistence
{
    public interface IApplicationContext
    {
        void Add<TEntity>(TEntity entity);
    }
}