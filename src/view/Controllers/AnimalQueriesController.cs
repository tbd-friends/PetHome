using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using PetHome.Handlers;
using PetHome.Handlers.Queries;
using viewmodels;

namespace view.Controllers
{
    [Route("animals")]
    [ApiController]
    public class AnimalQueriesController : ControllerBase
    {
        private readonly IMediator _mediator;

        public AnimalQueriesController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        public async Task<IEnumerable<AnimalSummary>> Get()
        {
            return await _mediator.Send(new GetAnimals());
        }

        [HttpGet("{id}")]
        public async Task<AnimalDetails> Get(Guid id)
        {
            return await _mediator.Send(new GetAnimalById() { Id = id });
        }

    }
}
