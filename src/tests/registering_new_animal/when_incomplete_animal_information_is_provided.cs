using System;
using System.Threading;
using Moq;
using PetHome.Handlers;
using PetHome.Handlers.Commands;
using PetHome.Persistence.Repositories;
using PetHome.Persistence.Repositories.Interfaces;
using Xunit;

namespace tests.registering_new_animal
{
    public class when_incomplete_animal_information_is_provided
    {
        private RegisterNewAnimalHandler Subject;
        private Mock<IUnitOfWork> UnitOfWork;

        public when_incomplete_animal_information_is_provided()
        {
            UnitOfWork = new Mock<IUnitOfWork>();

            Subject = new RegisterNewAnimalHandler(UnitOfWork.Object);
        }

        [Fact]
        public void argument_exception_is_thrown()
        {
            Action action = () => { Subject.Handle(new RegisterNewAnimal() { Species = "Bob" }, CancellationToken.None); };

            Assert.Throws<ArgumentException>(action);
        }
    }
}
