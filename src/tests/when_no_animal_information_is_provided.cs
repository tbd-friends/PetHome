using System;
using Moq;
using Xunit;

namespace tests
{
    public class when_no_animal_information_is_provided
    {
        private RegisterNewAnimalHandler Subject;
        private Mock<IApplicationContext> Context;

        public when_no_animal_information_is_provided()
        {
            Context = new Mock<IApplicationContext>();

            Subject = new RegisterNewAnimalHandler(Context.Object);
        }

        [Fact]
        public void argument_exception_is_thrown()
        {
            Action action = () => { Subject.Handle(new RegisterNewAnimal() { }); };

            Assert.Throws<ArgumentException>(action);
        }
    }

    public class Animal
    {
        public string Species { get; set; }
        public DateTime Entered { get; set; }
        public string Color { get; set; }
        public string Breed { get; set; }
        public string Gender { get; set; }
        public int Weight { get; set; }
    }

    public interface IApplicationContext
    {
        void Add<TEntity>(TEntity entity);
    }

    public class RegisterNewAnimal
    {
        public string Species { get; set; }
        public string Color { get; set; }
        public string Breed { get; set; }
        public string Gender { get; set; }
        public int Weight { get; set; }
    }

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
