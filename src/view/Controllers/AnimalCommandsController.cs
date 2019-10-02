using System;
using System.Threading.Tasks;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using PetHome.Handlers.Commands;
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
        public async Task<Guid> Register([FromBody] RegisterAnimalInputModel model)
        {
            var id = await _mediator.Send(new RegisterNewAnimal
            {
                Species = model.Species,
                Gender = model.Gender,
                Breed = model.Breed,
                Weight = model.Weight,
                Color = model.Color,
                TagNumber = model.TagNumber,
                Circumstances = model.Circumstances,
                VetRequired = model.VetRequired,
                Notes = model.Notes,
            });

            return id;
        }
    }
}