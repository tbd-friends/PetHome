using System.Threading;
using FluentAssertions;
using Moq;
using PetHome.Handlers;
using PetHome.Handlers.Commands;
using PetHome.Persistence;
using PetHome.Persistence.Models;
using Xunit;

namespace tests.concerning_completed_fields
{
    public class when_additional_fields_are_populated
    {
        private RegisterNewAnimalHandler Subject;
        private Mock<IApplicationContext> Context;
        private Animal Result;
        private const string TagNumber = "A123";
        private const string Circumstances = "Found Somewhere";
        private const bool VetRequired = true;
        private const string Notes = "Notes about the animal";

        private const string Breed = "Is Valid";
        private const string Color = "Is Valid";
        private const string Species = "Is Valid";
        private const string Gender = "Is Valid";
        private const int Weight = 1;

        public when_additional_fields_are_populated()
        {
            Context = new Mock<IApplicationContext>();

            Context.Setup(ctx => ctx.Add(It.IsAny<Animal>())).Callback((Animal a) => Result = a);

            Subject = new RegisterNewAnimalHandler(Context.Object);

            Subject.Handle(new RegisterNewAnimal
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
    }
}