using MediatR;
using System;
using System.Collections.Generic;
using System.Text;
using viewmodels;

namespace PetHome.Handlers.Queries
{
    public class GetAnimals: IRequest<IEnumerable<AnimalSummary>>
    {

    }
}
