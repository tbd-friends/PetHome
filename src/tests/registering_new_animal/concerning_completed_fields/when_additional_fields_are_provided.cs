using System;
using System.Threading;
using System.Threading.Tasks;
using FluentAssertions;
using Moq;
using PetHome.Handlers;
using PetHome.Handlers.Commands;
using PetHome.Persistence;
using PetHome.Persistence.Models;
using PetHome.Persistence.Repositories;
using PetHome.Persistence.Repositories.Interfaces;
using Xunit;

namespace tests.registering_new_animal.concerning_completed_fields
{
    public class when_additional_fields_are_provided
    {
        private RegisterNewAnimalHandler Subject;
        private Mock<IUnitOfWork> UnitOfWork;
        private Mock<IAnimalRepository> AnimalsRepository;
        private Animal Result;
        private Task<Guid> ResultId;
        private const string TagNumber = "A123";
        private const string Circumstances = "Found Somewhere";
        private const bool VetRequired = true;
        private const string Notes = "Notes about the animal";

        private const string Breed = "Is Valid";
        private const string Color = "Is Valid";
        private const string Species = "Is Valid";
        private const string Gender = "Is Valid";
        private const int Weight = 1;
        private Guid AnimalId = new Guid("B5C479A8-A7C9-4C16-866D-BC3F9A82B968");

        public when_additional_fields_are_provided()
        {
            UnitOfWork = new Mock<IUnitOfWork>();
            AnimalsRepository = new Mock<IAnimalRepository>();

            AnimalsRepository.Setup(ar => ar.Add(It.IsAny<Animal>()))
                .Callback((Animal a) =>
                {
                    Result = a;

                    Result.Id = AnimalId;
                });

            UnitOfWork.Setup(uow => uow.Animals).Returns(AnimalsRepository.Object);

            Subject = new RegisterNewAnimalHandler(UnitOfWork.Object);

            ResultId = Subject.Handle(new RegisterNewAnimal
            {
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
            Result.Tag.Should().Be(TagNumber);
        }

        [Fact]
        public void circumstances_is_set()
        {
            Result.Circumstances.Should().Be(Circumstances);
        }

        [Fact]
        public void vet_required_is_set()
        {
            Result.VetRequired.Should().Be(VetRequired);
        }

        [Fact]
        public void notes_is_set()
        {
            Result.Notes.Should().Be(Notes);
        }

        [Fact]
        public async Task handler_returns_id_of_animal()
        {
            (await ResultId).Should().Be(AnimalId);
        }
    }
}