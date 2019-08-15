using System;
using System.Threading;
using FluentAssertions;
using Moq;
using PetHome.Handlers;
using PetHome.Handlers.Commands;
using PetHome.Persistence.Models;
using PetHome.Persistence.Repositories.Interfaces;
using Xunit;

namespace tests.registering_new_animal.concerning_completed_fields
{
    public class when_required_fields_are_provided
    {
        private RegisterNewAnimalHandler Subject;
        private Mock<IUnitOfWork> UnitOfWork;
        private Mock<IAnimalRepository> AnimalsRepository;
        private Animal Result;
        private const string Breed = "Golden Doodle";
        private const string Color = "Brown";
        private const string Species = "Dog";
        private const string Gender = "Undetermined";
        private const int Weight = 2500;

        public when_required_fields_are_provided()
        {
            UnitOfWork = new Mock<IUnitOfWork>();
            AnimalsRepository = new Mock<IAnimalRepository>();

            AnimalsRepository.Setup(ar => ar.Add(It.IsAny<Animal>())).Callback((Animal a) => Result = a);

            UnitOfWork.Setup(uow => uow.Animals).Returns(AnimalsRepository.Object);

            Subject = new RegisterNewAnimalHandler(UnitOfWork.Object);

            Subject.Handle(new RegisterNewAnimal()
            { Species = Species, Color = Color, Breed = Breed, Gender = Gender, Weight = Weight }, CancellationToken.None);
        }

        [Fact]
        public void complete_is_called_on_uow()
        {
            UnitOfWork.Verify(uow => uow.Complete());
        }

        [Fact]
        public void species_is_set()
        {
            Result.Species.Should().Be(Species);
        }

        [Fact]
        public void color_is_set()
        {
            Result.Color.Should().Be(Color);
        }

        [Fact]
        public void breed_is_set()
        {
            Result.Breed.Should().Be(Breed);
        }

        [Fact]
        public void gender_is_set()
        {
            Result.Gender.Should().Be(Gender);
        }

        [Fact]
        public void weight_is_set()
        {
            Result.Weight.Should().Be(Weight);
        }

        [Fact]
        public void date_time_entered_is_set()
        {
            Result.Entered.Should().BeWithin(TimeSpan.FromSeconds(1)).Before(DateTime.UtcNow);
        }
    }
}