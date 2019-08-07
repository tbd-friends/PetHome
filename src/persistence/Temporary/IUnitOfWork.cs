using System;

namespace PetHome.Persistence.Temporary
{
  public interface IUnitOfWork : IDisposable
  {
    IAnimalRepository Animals { get; }

    int Complete();
  }
}