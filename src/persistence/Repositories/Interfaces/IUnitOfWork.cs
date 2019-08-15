namespace PetHome.Persistence.Repositories.Interfaces
{
    public interface IUnitOfWork
    {
        IAnimalRepository Animals { get; }

        void Complete();
    }
}