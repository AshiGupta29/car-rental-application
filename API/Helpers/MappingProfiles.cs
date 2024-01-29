using API.Dtos;
using AutoMapper;
using Core.Entities;
using Core.Entities.RentalAggregate;

namespace API.Helpers
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Car, CarToReturnDto>()
              .ForMember(d => d.CarMaker, o => o.MapFrom(s => s.CarMaker.Name))
              .ForMember(d => d.ImageUrl, o => o.MapFrom<CarUrlResolver>());
            CreateMap<CarCreateDto, Car>().ReverseMap();
            CreateMap<CustomerBasketDto, CustomerBasket>();
            CreateMap<BasketItemDto, BasketItem>();
            CreateMap<Order, OrderToReturnDto>()
              .ForMember(d => d.CarId, o => o.MapFrom(s => s.RentedCar.CarId))
            .ForMember(d => d.CarName, o => o.MapFrom(s => s.RentedCar.CarName))
            .ForMember(d => d.ImageUrl, o => o.MapFrom(s => s.RentedCar.ImageUrl))
            .ForMember(d => d.ImageUrl, o => o.MapFrom<OrderUrlResolver>())
            .ForMember(d => d.Model, o => o.MapFrom(s => s.RentedCar.Model))
            .ForMember(d => d.RentalPrice, o => o.MapFrom(s => s.RentedCar.RentalPrice));
        }
    }
}