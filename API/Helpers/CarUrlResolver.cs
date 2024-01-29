using API.Dtos;
using AutoMapper;
using Core.Entities;

namespace API.Helpers
{
    public class CarUrlResolver : IValueResolver<Car, CarToReturnDto, string>
    {
        private readonly IConfiguration config;
        public CarUrlResolver(IConfiguration config)
        {
            this.config = config;
            
        }
        public string Resolve(Car source, CarToReturnDto destination, string destMember, ResolutionContext context)
        {
           if(!string.IsNullOrEmpty(source.ImageUrl))
           {
             return this.config["ApiUrl"] + source.ImageUrl;
           }

           return null;
        }
    }
}