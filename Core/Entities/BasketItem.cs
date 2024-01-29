namespace Core.Entities
{
    public class BasketItem
    {
        public int Id { get; set; }
        public string CarName { get; set; }
        public decimal RentalPrice { get; set; }
        public int Model { get; set; }
        public string ImageUrl { get; set; }
        public string CarMaker { get; set; }
    }
}