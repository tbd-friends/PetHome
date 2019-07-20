using handlers;
using handlers.Commands;
using Microsoft.AspNetCore.Mvc;
using PetHome.Persistence;
using PetHome.View.InputModels;

namespace PetHome.View.Controllers
{
    [Route("animal")]
    [ApiController]
    public class AnimalCommandsController : ControllerBase
    {
        private readonly RegisterNewAnimalHandler _handler;

        public AnimalCommandsController(IApplicationContext context)
        {
            _handler = new RegisterNewAnimalHandler(context);
        }

        [HttpPost("register")]
        public void Register([FromBody] RegisterAnimalInputModel model)
        {
            _handler.Handle(new RegisterNewAnimal
            {
                Species = model.Species,
                Gender = model.Gender,
                Breed = model.Breed,
                Weight = model.Weight,
                Color = model.Color
            });
        }
    }
}