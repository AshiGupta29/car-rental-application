using System.ComponentModel.DataAnnotations;

namespace API.Dtos
{
    public class CarCreateDto
    {

        [Required]
        public string Name { get; set; }
        
        [Required]
        public int Model { get; set; }
        
        [Required]
        public int CarMakerId { get; set; }

        [Required]
        public bool AvailabilityStatus { get; set; }
        
        [Required]
        public string ImageUrl { get; set; }
        
        [Required]
        public decimal RentalPrice { get; set; }
    }
}