namespace API.Dtos
{
    public class CarToReturnDto
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public int Model { get; set; }

        public string CarMaker { get; set; }

        public bool AvailabilityStatus { get; set; }

        public string ImageUrl { get; set; }

        public decimal RentalPrice { get; set; }
    }
}