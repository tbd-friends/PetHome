using MediatR;

namespace PetHome.Handlers.Commands
{
    public class RegisterNewAnimal : IRequest
    {
        public string Species { get; set; }
        public string Color { get; set; }
        public string Breed { get; set; }
        public string Gender { get; set; }
        public int Weight { get; set; }
        public string TagNumber { get; set; }
        public string Circumstances { get; set; }
        public bool VetRequired { get; set; }
        public string Notes { get; set; }
    }
}