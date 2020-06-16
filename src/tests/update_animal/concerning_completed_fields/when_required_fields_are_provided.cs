using System;
using System.Threading;
using System.Threading.Tasks;
using FluentAssertions;
using Moq;
using PetHome.Handlers;
using PetHome.Handlers.Commands;
using PetHome.Persistence.Models;
using PetHome.Persistence.Repositories.Interfaces;
using Xunit;

namespace tests.update_animal.concerning_completed_fields
{
    public class when_required_fields_are_provided
    {
        private const string AnimalId = "B5C479A8-A7C9-4C16-866D-BC3F9A82B968";
        private UpdateAnimalHandler Subject;
        private Mock<IUnitOfWork> UnitOfWork;
        private Mock<IAnimalRepository> AnimalsRepository;
        private Animal Model = new Animal
        {
            Id = new Guid(AnimalId),
            Species = "Is Valid",
            Color = "Is Valid",
            Breed = "Is Valid",
            Gender = "Is Valid",
            Weight = 1,
            Tag = "SomeTag",
            Circumstances = "SomeCircumstances",
            VetRequired = true,
            Notes = "SomeNotes"
        };
        private const string Breed = "Golden Doodle";
        private const string Color = "Brown";
        private const string Species = "Dog";
        private const string Gender = "Undetermined";
        private const int Weight = 2500;


        public when_required_fields_are_provided()
        {
            UnitOfWork = new Mock<IUnitOfWork>();
            AnimalsRepository = new Mock<IAnimalRepository>();

            AnimalsRepository.Setup(ar => ar.GetById(It.Is<Guid>((guid) => guid.ToString().ToUpper() == AnimalId))).Returns(Model);

            UnitOfWork.Setup(uow => uow.Animals).Returns(AnimalsRepository.Object);

            Subject = new UpdateAnimalHandler(UnitOfWork.Object);

            Subject.Handle(new UpdateAnimal()
            {
                Id = new Guid(AnimalId),
                Species = Species,
                Color = Color,
                Breed = Breed,
                Gender = Gender,
                Weight = Weight,
            },
                CancellationToken.None);
        }

        [Fact]
        public void complete_is_called_on_uow()
        {
            UnitOfWork.Verify(uow => uow.Complete());
        }

        [Fact]
        public void species_is_set()
        {
            Model.Species.Should().Be(Species);
        }

        [Fact]
        public void color_is_set()
        {
            Model.Color.Should().Be(Color);
        }

        [Fact]
        public void breed_is_set()
        {
            Model.Breed.Should().Be(Breed);
        }

        [Fact]
        public void gender_is_set()
        {
            Model.Gender.Should().Be(Gender);
        }

        [Fact]
        public void weight_is_set()
        {
            Model.Weight.Should().Be(Weight);
        }
    }
}