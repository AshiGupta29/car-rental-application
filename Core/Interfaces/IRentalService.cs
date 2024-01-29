using Core.Entities.RentalAggregate;

namespace Core.Interfaces
{
    public interface IRentalService
    {
        Task<Order> CreateOrderAsync(string buyerEmail, string basketId, DateTime startDate, DateTime returnDate);
        Task<IReadOnlyList<Order>> GetOrdersForUserAsync(string buyerEmail);
        Task<IReadOnlyList<Order>> GetOrdersForAdminAsync();
        Task<Order> GetOrderByIdAsync(int id, string buyerEmail);
        Task<int> GetCarIDAsync(string basketId);
    }
}