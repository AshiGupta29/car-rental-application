namespace Core.Entities.RentalAggregate
{
     public class Order : BaseEntity
    {
        public Order()
        {
        }

        public Order(RentedCar rentedCar, string buyerEmail, DateTime startDate, DateTime returndate,decimal total)
        {
            BuyerEmail = buyerEmail;
            RentedCar = rentedCar;
            Total = total;
            StartDate = startDate;
            ReturnDate = returndate;
            IsReturned = 1;
        }

        public string BuyerEmail { get; set; }
        public DateTime Orderdate { get; set; } = DateTime.UtcNow;
        public RentedCar RentedCar { get; set; }
        public decimal Total { get; set; }
        public DateTime? StartDate { get; set; } = DateTime.UtcNow;
        public DateTime? ReturnDate { get; set; } = DateTime.UtcNow;
        public int IsReturned {get; set;} = 1;
    }
}