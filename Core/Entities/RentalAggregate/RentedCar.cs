namespace Core.Entities.RentalAggregate
{
    public class RentedCar : BaseEntity
    {
        public RentedCar()
        {
        }

        public RentedCar(int carId, string carName, string imageUrl, int model, decimal rentalPrice)
        {
            CarId = carId;
            CarName = carName;
            ImageUrl = imageUrl;
            Model = model;
            RentalPrice = rentalPrice;
        }

        public int CarId { get; set; }
        public string CarName { get; set; }
        public string ImageUrl { get; set; }
        public int Model { get; set; }
        public decimal RentalPrice { get; set; }
    }
}