using API.Dtos;
using AutoMapper;
using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class BasketController : BaseApiController
    {
        private readonly IBasketRepository basketrepository;
        private readonly IMapper mapper;

        public BasketController(IBasketRepository basketrepository, IMapper mapper)
        {
            this.mapper = mapper;
            this.basketrepository = basketrepository;
        }

        [HttpGet]
        public async Task<ActionResult<CustomerBasket>> GetBasketById(string id)
        {
            var basket = await this.basketrepository.GetBasketAsync(id);

            return Ok(basket ?? new CustomerBasket(id));
        }

        [HttpPost]
        public async Task<ActionResult<CustomerBasket>> UpdateBasket(CustomerBasketDto basket)
        {
            var customerBasket = this.mapper.Map<CustomerBasketDto, CustomerBasket>(basket);

            var updatedBasket = await this.basketrepository.UpdateBasketAsync(customerBasket);

            return Ok(updatedBasket);
        }

    }
}