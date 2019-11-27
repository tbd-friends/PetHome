using MediatR;
using System;
using System.Collections.Generic;
using System.Text;
using viewmodels;

namespace PetHome.Handlers
{
    public class GetAnimalById : IRequest<AnimalDetails>
    {
        public Guid Id { get; set; }
    }
}
