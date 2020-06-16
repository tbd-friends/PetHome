using System;
using MediatR;
using PetHome.Handlers.Commands;
using System.Threading;
using System.Threading.Tasks;
using PetHome.Persistence.Repositories.Interfaces;

namespace PetHome.Handlers
{
    public class UpdateAnimalHandler : IRequestHandler<UpdateAnimal>
    {
        private readonly IUnitOfWork _uow;

        public UpdateAnimalHandler(IUnitOfWork uow)
        {
            _uow = uow;

        }

        public Task<Unit> Handle(UpdateAnimal request, CancellationToken cancellationToken)
        {
            if (!HasMinimumRequiredAnimalInformation(request))
            {
                throw new ArgumentException();
            }

            var animal = _uow.Animals.GetById(request.Id);

            animal.Species = request.Species;
            animal.Color = request.Color;
            animal.Breed = request.Breed;
            animal.Gender = request.Gender;
            animal.Weight = request.Weight;
            animal.Tag = request.TagNumber;
            animal.Circumstances = request.Circumstances;
            animal.VetRequired = request.VetRequired;
            animal.Notes = request.Notes;

            _uow.Complete();

            return Unit.Task;
        }

        private bool HasMinimumRequiredAnimalInformation(UpdateAnimal request)
        {
            return request != null &&
                   !string.IsNullOrEmpty(request.Species) &&
                   !string.IsNullOrEmpty(request.Breed) &&
                   !string.IsNullOrEmpty(request.Color) &&
                   !string.IsNullOrEmpty(request.Gender) &&
                   request.Weight > 0;
        }
    }
}