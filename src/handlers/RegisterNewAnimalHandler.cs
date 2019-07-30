using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using PetHome.Handlers.Commands;
using PetHome.Persistence;
using PetHome.Persistence.Models;

namespace PetHome.Handlers
{
    public class RegisterNewAnimalHandler : IRequestHandler<RegisterNewAnimal>
    {
        private readonly IApplicationContext _context;

        public RegisterNewAnimalHandler(IApplicationContext context)
        {
            _context = context;
        }

        public Task<Unit> Handle(RegisterNewAnimal request, CancellationToken cancellationToken)
        {
            if (request == null || string.IsNullOrEmpty(request.Species) ||
                string.IsNullOrEmpty(request.Breed) ||
                string.IsNullOrEmpty(request.Color) ||
                string.IsNullOrEmpty(request.Gender) ||
                request.Weight == 0)
            {
                throw new ArgumentException();
            }

            _context.Add(new Animal
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

            return Unit.Task;
        }
    }
}