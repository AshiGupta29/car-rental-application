using System.ComponentModel.DataAnnotations;

namespace Core.Entities
{
    public class Car : BaseEntity
    {
        public string Name { get; set; }

        public int Model { get; set; }

        public CarMaker CarMaker { get; set; }

        public int CarMakerId { get; set; }

        public bool AvailabilityStatus { get; set; }

        public string ImageUrl { get; set; }

        public decimal RentalPrice { get; set; }
    }
}