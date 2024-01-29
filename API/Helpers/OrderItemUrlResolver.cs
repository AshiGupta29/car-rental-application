using API.Dtos;
using AutoMapper;
using Core.Entities.RentalAggregate;

namespace API.Helpers
{
         public class OrderUrlResolver : IValueResolver<Order, OrderToReturnDto, string>
    {
        private readonly IConfiguration _config;
        public OrderUrlResolver(IConfiguration config)
        {
            _config = config;
        }

        public string Resolve(Order source, OrderToReturnDto destination, string destMember, ResolutionContext context)
        {
            if (!string.IsNullOrEmpty(source.RentedCar.ImageUrl))
            {
                return _config["ApiUrl"] + source.RentedCar.ImageUrl;
            }

            return null;
        }
    }
    
}