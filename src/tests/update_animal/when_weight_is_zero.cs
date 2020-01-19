using System;
using System.Threading;
using Moq;
using PetHome.Handlers;
using PetHome.Handlers.Commands;
using PetHome.Persistence;
using PetHome.Persistence.Models;
using PetHome.Persistence.Repositories;
using PetHome.Persistence.Repositories.Interfaces;
using Xunit;

namespace tests.update_animal
{
    public class when_weight_is_zero
    {
        private UpdateAnimalHandler Subject;
        private Mock<IUnitOfWork> UnitOfWork;
        private Animal Result;
        private const string Breed = "Golden Doodle";
        private const string Color = "Brown";
        private const string Species = "Dog";
        private const string Gender = "Undetermined";
        private const uint Weight = 0;

        public when_weight_is_zero()
        {
            UnitOfWork = new Mock<IUnitOfWork>();

            Subject = new UpdateAnimalHandler(UnitOfWork.Object);
        }

        [Fact]
        public void exception_is_thrown()
        {
            Action action = () =>
            {
                Subject.Handle(new UpdateAnimal()
                { Species = Species, Color = Color, Breed = Breed, Gender = Gender, Weight = Weight },
                    CancellationToken.None);
            };

            Assert.Throws<ArgumentException>(action);
        }
    }
}