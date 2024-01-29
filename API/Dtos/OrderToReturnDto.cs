namespace API.Dtos
{
    public class OrderToReturnDto
    {
        public int Id { get; set; }
        public string BuyerEmail { get; set; }
        public DateTime Orderdate { get; set; }
        public decimal Total { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? ReturnDate { get; set; }
        public int IsReturned{get; set;}
        public int CarId { get; set; }
        public string CarName { get; set; }
        public string ImageUrl { get; set; }
        public int Model { get; set; }
        public decimal RentalPrice { get; set; }
    }
}