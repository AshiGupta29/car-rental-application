using Core.Entities;
using Core.Entities.RentalAggregate;
using Core.Interfaces;
using Core.Specifications;
using Infrastructure.Data.Specifications;
using System.Linq;

namespace Infrastructure.Services
{
    public class RentalService : IRentalService
    {
        private readonly IBasketRepository basketRepo;
        private readonly IUnitOfWork unitOfWork;

        public RentalService(IBasketRepository basketRepo, IUnitOfWork unitOfWork)
        {
            this.basketRepo = basketRepo;
            this.unitOfWork = unitOfWork;
        }

        public async Task<int> GetCarIDAsync(string basketId)
        {
            var basket = await this.basketRepo.GetBasketAsync(basketId);
            var id = basket.Item.Id;
            return id;
        }


        public async Task<Order> CreateOrderAsync(string buyerEmail, string basketId, DateTime startDate, DateTime returnDate)
        {
            // 1. Get the user's basket
            var basket = await this.basketRepo.GetBasketAsync(basketId);

            // 2. Check if the basket is empty or doesn't exist
            if (basket == null)
            {
                return null;
            }

            var basketItem = basket.Item;

            // Create a rented car based on the basket item
            var rentedCar = new RentedCar
            {
                CarId = basketItem.Id,
                CarName = basketItem.CarName,
                ImageUrl = TrimUrl(basketItem.ImageUrl),
                Model = basketItem.Model,
                RentalPrice = basketItem.RentalPrice
            };

            // Calculate the total based on the rental period
            var totalDays = (int)(returnDate - startDate).TotalDays;
            var total = rentedCar.RentalPrice * totalDays;


            // Create an order for the rented car
            var order = new Order(rentedCar, buyerEmail, startDate, returnDate, total);

            // 3. Save the order to the database
            this.unitOfWork.Repository<Order>().Add(order);
            var result = await this.unitOfWork.Complete();

            if (result <= 0) return null; // Failed to save the order

            // 4. Delete the basket
            await this.basketRepo.DeleteBasketAsync(basketId);

            return order;
        }

        public async Task<Order> GetOrderByIdAsync(int id, string buyerEmail)
        {
            var spec = new OrdersWithItemsAndOrderingSpecification(id, buyerEmail);

            return await this.unitOfWork.Repository<Order>().GetEntityWithSpec(spec);
        }

        public async Task<IReadOnlyList<Order>> GetOrdersForUserAsync(string buyerEmail)
        {
            var spec = new OrdersWithItemsAndOrderingSpecification(buyerEmail);

            return await this.unitOfWork.Repository<Order>().ListAsync(spec);
        }
        public async Task<IReadOnlyList<Order>> GetOrdersForAdminAsync()
        {
            return await this.unitOfWork.Repository<Order>().ListAllAsync();
        }

        private string TrimUrl(string url)
        {
            int startIndex = url.IndexOf('/', url.IndexOf("//") + 2);
            if (startIndex != -1)
            {
                return url.Substring(startIndex + 1);
            }
            return url;
        }


    }
}