using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.Dtos
{
    public class BasketItemDto
    {
        [Required]
        public int Id { get; set; }
        [Required]
        public string CarName { get; set; }
        [Required]
        public decimal RentalPrice { get; set; }
        [Required]
        public int Model { get; set; }
        [Required]
        public string ImageUrl { get; set; }
        [Required]
        public string CarMaker { get; set; }
    }
}