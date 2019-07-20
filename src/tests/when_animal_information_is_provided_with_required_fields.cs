using System;
using FluentAssertions;
using Moq;
using Xunit;

namespace tests
{
    public class when_animal_information_is_provided_with_required_fields
    {
        private RegisterNewAnimalHandler Subject;
        private Mock<IApplicationContext> Context;
        private Animal Result;
        private const string Breed = "Golden Doodle";
        private const string Color = "Brown";
        private const string Species = "Dog";
        private const string Gender = "Undetermined";
        private const int Weight = 2500;

        public when_animal_information_is_provided_with_required_fields()
        {
            Context = new Mock<IApplicationContext>();

            Context.Setup(ctx => ctx.Add(It.IsAny<Animal>())).Callback((Animal a) => Result = a);

            Subject = new RegisterNewAnimalHandler(Context.Object);


            Subject.Handle(new RegisterNewAnimal()
                { Species = Species, Color = Color, Breed = Breed, Gender = Gender, Weight = Weight });
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