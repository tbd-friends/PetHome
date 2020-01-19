namespace PetHome.View.InputModels
{
    public class UpdateAnimalInputModel
    {
        public string Species { get; set; }
        public string Color { get; set; }
        public string Breed { get; set; }
        public string Gender { get; set; }
        public uint Weight { get; set; }
        public string TagNumber { get; set; }
        public string Circumstances { get; set; }
        public bool VetRequired { get; set; }
        public string Notes { get; set; }
    }
}