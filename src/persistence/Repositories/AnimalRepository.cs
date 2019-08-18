using PetHome.Persistence.Models;
using PetHome.Persistence.Repositories.Interfaces;

namespace PetHome.Persistence.Repositories
{
    public class AnimalRepository : BaseRepository<Animal>, IAnimalRepository
    {
        public AnimalRepository(ApplicationContext context) : base(context)
        {

        }
    }
}