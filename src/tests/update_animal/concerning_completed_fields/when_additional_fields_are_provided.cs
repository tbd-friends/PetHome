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
    public class when_additional_fields_are_provided
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
        private const string TagNumber = "SomeNewTag";
        private const string Circumstances = "SomeNewCircumstances";
        private const bool VetRequired = false;
        private const string Notes = "SomeNewNotes";

        private const string Breed = "IsStillValid";
        private const string Color = "IsStillValid";
        private const string Species = "IsStillValid";
        private const string Gender = "IsStillValid";
        private const int Weight = 2;

        public when_additional_fields_are_provided()
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
                TagNumber = TagNumber,
                Circumstances = Circumstances,
                VetRequired = VetRequired,
                Notes = Notes
            },
                CancellationToken.None);
        }

        [Fact]
        public void complete_is_called_on_uow()
        {
            UnitOfWork.Verify(uow => uow.Complete());
        }

        [Fact]
        public void tag_no_is_set()
        {
            Model.Tag.Should().Be(TagNumber);
        }

        [Fact]
        public void circumstances_is_set()
        {
            Model.Circumstances.Should().Be(Circumstances);
        }

        [Fact]
        public void vet_required_is_set()
        {
            Model.VetRequired.Should().Be(VetRequired);
        }

        [Fact]
        public void notes_is_set()
        {
            Model.Notes.Should().Be(Notes);
        }
    }
}