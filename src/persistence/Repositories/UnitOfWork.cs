using PetHome.Persistence.Repositories.Interfaces;

namespace PetHome.Persistence.Repositories
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly ApplicationContext _context;

        public UnitOfWork(ApplicationContext context)
        {
            _context = context;

            Animals = new AnimalRepository(context);
        }

        public IAnimalRepository Animals { get; }

        public void Complete()
        {
            _context.SaveChanges();
        }
    }
}