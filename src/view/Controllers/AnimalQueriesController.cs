using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
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


    }
}
