using API.Dtos;
using AutoMapper;
using Core.Entities;

namespace API.Helpers
{

    public class NullValueResolver : IValueResolver<CarCreateDto, Car, object>
{
    public object Resolve(CarCreateDto source, Car destination, object destMember, ResolutionContext context)
    {
        return null;
    }
}


}
