using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.Dtos
{
    public class CustomerBasketDto
    {
        [Required]
        public string Id { get; set; }
        public BasketItemDto Item { get; set; }
        public DateTime StartDate{get; set;}
        public DateTime ReturnDate{get; set;}
        public int TotalDays{get; set;}
    }
}