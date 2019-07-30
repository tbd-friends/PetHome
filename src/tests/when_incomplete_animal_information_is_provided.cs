using System;
using System.Threading;
using Moq;
using PetHome.Handlers;
using PetHome.Handlers.Commands;
using PetHome.Persistence;
using Xunit;

namespace tests
{
    public class when_incomplete_animal_information_is_provided
    {
        private RegisterNewAnimalHandler Subject;
        private Mock<IApplicationContext> Context;

        public when_incomplete_animal_information_is_provided()
        {
            Context = new Mock<IApplicationContext>();

            Subject = new RegisterNewAnimalHandler(Context.Object);
        }

        [Fact]
        public void argument_exception_is_thrown()
        {
            Action action = () => { Subject.Handle(new RegisterNewAnimal() { Species = "Bob" }, CancellationToken.None); };

            Assert.Throws<ArgumentException>(action);
        }
    }
}
