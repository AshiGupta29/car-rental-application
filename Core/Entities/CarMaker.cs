using System;
using System.ComponentModel.DataAnnotations;

namespace Core.Entities
{
    public class CarMaker : BaseEntity
    {
        public string  Name { get; set; }
    }
}