using MediatR;
using PetHome.Handlers.Queries;
using PetHome.Persistence.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using viewmodels;

namespace PetHome.Handlers
{
    public class GetAnimalsHandler : IRequestHandler<GetAnimals, IEnumerable<AnimalListViewModel>>
    {
        private readonly IUnitOfWork _UnitOfWork;

        public GetAnimalsHandler(IUnitOfWork unitOfWork)
        {
            _UnitOfWork = unitOfWork;
        }
        public async Task<IEnumerable<AnimalListViewModel>> Handle(GetAnimals request, CancellationToken cancellationToken)
        {
            return await Task.FromResult(_UnitOfWork.Animals.GetAll(request));
        }
    }
}
