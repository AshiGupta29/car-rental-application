using API.Dtos;
using API.Errors;
using API.Extensions;
using AutoMapper;
using Core.Entities;
using Core.Entities.RentalAggregate;
using Core.Entities.Identity;
using Core.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;

namespace API.Controllers
{
    public class RentalsController : BaseApiController
    {
        private readonly IRentalService rentalService;
        private readonly IMapper mapper;
         private readonly IUnitOfWork unitOfWork;
        public RentalsController(IRentalService rentalService, IMapper mapper, IUnitOfWork unitOfWork)
        {
            this.mapper = mapper;
            this.rentalService = rentalService;
            this.unitOfWork = unitOfWork;

        }
        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<OrderToReturnDto>>> GetOrdersForUser()
        {
            var orders = await this.rentalService.GetOrdersForAdminAsync();
            return Ok(this.mapper.Map<IReadOnlyList<OrderToReturnDto>>(orders));

        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteOrder(int id)
        {
            // Get the order from the repository
            var order = await this.unitOfWork.Repository<Order>().GetByIdAsync(id);
            if (order == null)
            {
                return NotFound(new ApiResponse(404));
            }

            // Delete the order from the repository
            this.unitOfWork.Repository<Order>().Delete(order);
            await this.unitOfWork.Complete();

            // Return a success response
            return NoContent();
        }
    }
}