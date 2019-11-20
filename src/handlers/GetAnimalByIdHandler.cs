using MediatR;
using PetHome.Persistence.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using viewmodels;

namespace PetHome.Handlers
{
    public class GetAnimalByIdHandler : IRequestHandler<GetAnimalById, AnimalDetails>
    {
        private readonly IUnitOfWork _unitOfWork;

        public GetAnimalByIdHandler(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        public Task<AnimalDetails> Handle(GetAnimalById request, CancellationToken cancellationToken)
        {
            var animal = _unitOfWork.Animals.GetById(request.Id);

            return Task.FromResult(new AnimalDetails 
            {
                Id = animal.Id,
                Species = animal.Species,
                Breed = animal.Breed,
                Color = animal.Color,
                Gender = animal.Gender,
                Weight = animal.Weight,
                Tag = animal.Tag,
                Circumstances = animal.Circumstances,
                Entered = animal.Entered,
                VetRequired = animal.VetRequired,
                Notes = animal.Notes
            });
        }
    }
}
