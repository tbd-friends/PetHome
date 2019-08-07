namespace PetHome.Persistence.Temporary
{
  public class UnitOfWork : IUnitOfWork
  {
    private readonly ApplicationContext _context;

    public UnitOfWork(ApplicationContext context)
    {
      _context = context;
      Animals = new AnimalRepository(_context);
    }

    public IAnimalRepository Animals { get; }

    public int Complete()
    {
      return _context.SaveChanges();
    }

    public void Dispose()
    {
      _context?.Dispose();
    }
  }
}