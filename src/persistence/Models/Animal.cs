using System;

namespace PetHome.Persistence.Models
{
    public class Animal
    {
        public string Species { get; set; }
        public DateTime Entered { get; set; }
        public string Color { get; set; }
        public string Breed { get; set; }
        public string Gender { get; set; }
        public int Weight { get; set; }
    }
}