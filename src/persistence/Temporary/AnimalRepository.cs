using Microsoft.EntityFrameworkCore;
using PetHome.Persistence.Models;

namespace PetHome.Persistence.Temporary
{
  public class AnimalRepository : Repository<Animal>, IAnimalRepository
  {
    public AnimalRepository(ApplicationContext context) : base(context)
    {
    }

    public ApplicationContext ApplicationContext => base.Context as ApplicationContext;
  }
}