namespace tests
{
    public interface IApplicationContext
    {
        void Add<TEntity>(TEntity entity);
    }
}