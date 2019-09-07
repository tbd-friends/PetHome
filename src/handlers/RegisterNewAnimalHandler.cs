using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using PetHome.Handlers.Commands;
using PetHome.Persistence.Models;
using PetHome.Persistence.Repositories;
using PetHome.Persistence.Repositories.Interfaces;

namespace PetHome.Handlers
{
    public class RegisterNewAnimalHandler : IRequestHandler<RegisterNewAnimal>
    {
        private readonly IUnitOfWork _uow;

        public RegisterNewAnimalHandler(IUnitOfWork uow)
        {
            _uow = uow;
        }

        public Task<Unit> Handle(RegisterNewAnimal request, CancellationToken cancellationToken)
        {
            if (!HasMinimumRequiredAnimalInformation(request))
            {
                throw new ArgumentException();
            }

            _uow.Animals.Add(new Animal
            {
                Species = request.Species,
                Color = request.Color,
                Breed = request.Breed,
                Gender = request.Gender,
                Weight = request.Weight,
                Entered = DateTime.UtcNow,
                Tag = request.TagNumber,    
                Circumstances = request.Circumstances,
                VetRequired = request.VetRequired,
                Notes = request.Notes
            });

            _uow.Complete();

            return Unit.Task;
        }

        private bool HasMinimumRequiredAnimalInformation(RegisterNewAnimal request)
        {
            return request != null && !string.IsNullOrEmpty(request.Species) &&
                   !string.IsNullOrEmpty(request.Breed) &&
                   !string.IsNullOrEmpty(request.Color) &&
                   !string.IsNullOrEmpty(request.Gender) &&
                   request.Weight > 0;
        }
    }
}