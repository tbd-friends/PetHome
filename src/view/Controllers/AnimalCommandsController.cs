using MediatR;
using Microsoft.AspNetCore.Mvc;
using PetHome.Handlers.Commands;
using PetHome.Persistence;
using PetHome.View.InputModels;

namespace PetHome.View.Controllers
{
    [Route("animal")]
    [ApiController]
    public class AnimalCommandsController : ControllerBase
    {
        private readonly IMediator _mediator;

        public AnimalCommandsController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost("register")]
        public void Register([FromBody] RegisterAnimalInputModel model)
        {
            _mediator.Send(new RegisterNewAnimal
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