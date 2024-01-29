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

    [Authorize]
    public class OrdersController : BaseApiController
    {
        private readonly UserManager<AppUser> userManager;
        private readonly IRentalService rentalService;
        private readonly IMapper mapper;
        private readonly IUnitOfWork unitOfWork;
        public OrdersController(UserManager<AppUser> userManager, IRentalService rentalService, IMapper mapper, IUnitOfWork unitOfWork)
        {
            this.userManager = userManager;
            this.mapper = mapper;
            this.rentalService = rentalService;
            this.unitOfWork = unitOfWork;

        }

        [HttpPost]
        public async Task<ActionResult<Order>> CreateOrder(OrderDto orderDto)
        {
            //Update Car Availablity Status
            var CarId = await this.rentalService.GetCarIDAsync(orderDto.BasketId);
            var car = await this.unitOfWork.Repository<Car>().GetByIdAsync(CarId);
            car.AvailabilityStatus = false;
            // mapper.Map(carDto, car);
            unitOfWork.Repository<Car>().Update(car);
            await this.unitOfWork.Complete();

            var email = HttpContext.User.RetrieveEmailFromPrincipal();

            var order = await this.rentalService.CreateOrderAsync(email, orderDto.BasketId, orderDto.StartDate, orderDto.ReturnDate);

            if (order == null) return BadRequest(new ApiResponse(400, "Problem creating order"));

            return Ok(order);
        }

        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<OrderToReturnDto>>> GetOrdersForUser()
        {
            var email = HttpContext.User.RetrieveEmailFromPrincipal();
            var orders = await this.rentalService.GetOrdersForUserAsync(email);
            return Ok(this.mapper.Map<IReadOnlyList<OrderToReturnDto>>(orders));

        }

        [HttpGet("{id}")]
        public async Task<ActionResult<OrderToReturnDto>> GetOrderByIdForUser(int id)
        {
            var email = User.RetrieveEmailFromPrincipal();

            var order = await this.rentalService.GetOrderByIdAsync(id, email);

            if (order == null) return NotFound(new ApiResponse(404));

            return this.mapper.Map<OrderToReturnDto>(order);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Order>> UpdateOrder(int id, [FromBody] OrderToReturnDto orderDto)
        {
            var order = await this.unitOfWork.Repository<Order>().GetByIdAsync(orderDto.Id);
            var car = await this.unitOfWork.Repository<Car>().GetByIdAsync(orderDto.CarId);
            if (order == null)
            {
                return NotFound(new ApiResponse(404));
            }
            order.IsReturned = orderDto.IsReturned;
            order.BuyerEmail = orderDto.BuyerEmail;
            order.Orderdate = orderDto.Orderdate;
            order.Total = orderDto.Total;
            order.StartDate = orderDto.StartDate;
            order.ReturnDate = orderDto.ReturnDate;
            order.RentedCar.CarId = orderDto.CarId;
            order.RentedCar.CarName = orderDto.CarName;
            order.RentedCar.ImageUrl = orderDto.ImageUrl;
            order.RentedCar.Model = orderDto.Model;
            order.RentedCar.RentalPrice = orderDto.RentalPrice;

            if(orderDto.IsReturned == 3)
            car.AvailabilityStatus = true;
            

            // Save the changes to the repository
            unitOfWork.Repository<Order>().Update(order);
            await this.unitOfWork.Complete();

            return order;

        }

    }

}