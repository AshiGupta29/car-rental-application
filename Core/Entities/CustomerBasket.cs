namespace Core.Entities
{
    public class CustomerBasket
    {
        public CustomerBasket()
        {
        }

        public CustomerBasket(string id)
        {
            Id = id;
        }

        public string Id { get; set; }
        public BasketItem Item { get; set; }
        public DateTime StartDate{get; set;}
        public DateTime ReturnDate{get; set;}
        public int TotalDays{get; set;}
    }
}