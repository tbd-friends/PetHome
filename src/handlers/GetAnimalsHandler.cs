using MediatR;
using PetHome.Handlers.Queries;
using PetHome.Persistence.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using viewmodels;

namespace PetHome.Handlers
{
    public class GetAnimalsHandler : IRequestHandler<GetAnimals, IEnumerable<AnimalSummaryViewModel>>
    {
        private readonly IUnitOfWork _UnitOfWork;

        public GetAnimalsHandler(IUnitOfWork unitOfWork)
        {
            _UnitOfWork = unitOfWork;
        }
        public async Task<IEnumerable<AnimalSummaryViewModel>> Handle(GetAnimals request, CancellationToken cancellationToken)
        {
            return await Task.FromResult(
                _UnitOfWork.Animals.GetAll().Select(c => new AnimalSummaryViewModel 
                {
                    Id = c.Id,
                    Species = c.Species,
                    Entered = c.Entered,
                    Color = c.Color,
                    Breed = c.Breed,
                    Gender = c.Gender,
                    Weight = c.Weight,
                    Tag = c.Tag,
                    Circumstances = c.Circumstances,
                    VetRequired = c.VetRequired
                }));
        }
    }
}
