using System;

namespace tests
{
    public class RegisterNewAnimalHandler
    {
        private readonly IApplicationContext _context;

        public RegisterNewAnimalHandler(IApplicationContext context)
        {
            _context = context;
        }

        public void Handle(RegisterNewAnimal command)
        {
            if (command == null || string.IsNullOrEmpty(command.Species))
            {
                throw new ArgumentException();
            }

            _context.Add(new Animal
            {
                Species = command.Species,
                Color = command.Color,
                Breed = command.Breed,
                Gender = command.Gender,
                Weight = command.Weight,
                Entered = DateTime.UtcNow
            });
        }
    }
}