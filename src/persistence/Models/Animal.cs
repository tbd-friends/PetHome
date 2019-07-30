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
        public string Tag { get; set; }
        public string Circumstances { get; set; }
        public bool VetRequired { get; set; }
        public string Notes { get; set; }
    }
}