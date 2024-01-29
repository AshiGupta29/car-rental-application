using Core.Entities;
using Microsoft.AspNetCore.Mvc;
using Core.Interfaces;
using Core.Specifications;
using API.Dtos;
using AutoMapper;
using API.Errors;
using API.Helpers;
using Infrastructure.Data.Specifications;

namespace API.Controllers
{
    public class CarsController : BaseApiController
    {
        private readonly IMapper mapper;
        private readonly IUnitOfWork unitOfWork;

        public CarsController(IMapper mapper, IUnitOfWork unitOfWork)
        {
            this.mapper = mapper;
            this.unitOfWork = unitOfWork;
        }

        [HttpGet]
        public async Task<ActionResult<Pagination<CarToReturnDto>>> GetCars([FromQuery] CarSpecParams carParams)
        {
            var spec = new CarsWithMakersSpecification(carParams);

            var countSpec = new CarsWithFiltersForCountSpecification(carParams);

            var totalItems = await this.unitOfWork.Repository<Car>().CountAsync(countSpec);

            var cars = await this.unitOfWork.Repository<Car>().ListAsync(spec);

            var data = this.mapper.Map<IReadOnlyList<Car>, IReadOnlyList<CarToReturnDto>>(cars);

            return Ok(new Pagination<CarToReturnDto>(carParams.PageIndex, carParams.PageSize, totalItems, data));
        }

        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]
        public async Task<ActionResult<CarToReturnDto>> GetCars(int id)
        {
            var spec = new CarsWithMakersSpecification(id);
            var car = await this.unitOfWork.Repository<Car>().GetEntityWithSpec(spec);

            if (car == null) return NotFound(new ApiResponse(404));
            return this.mapper.Map<Car, CarToReturnDto>(car);
        }

        [HttpGet("makers")]
        public async Task<ActionResult<IReadOnlyList<CarMaker>>> GetCarMakers()
        {
            return Ok(await this.unitOfWork.Repository<CarMaker>().ListAllAsync());
        }

        [HttpPost]
        public async Task<ActionResult<Car>> AddCar([FromBody] CarCreateDto carDto)
        {

            // Map the DTO to the Car entity
            var car = mapper.Map<CarCreateDto, Car>(carDto);

            // Add the car to the repository
            unitOfWork.Repository<Car>().Add(car);
            await unitOfWork.Complete();

            // Map the created car back to the DTO and return it
            var createdCarDto = mapper.Map<Car, CarCreateDto>(car);
            return CreatedAtAction(nameof(GetCars), new { id = createdCarDto.Name }, createdCarDto);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Car>> UpdateCar(int id, [FromBody] CarCreateDto carDto)
        {
            // Get the car from the repository
            var car = await this.unitOfWork.Repository<Car>().GetByIdAsync(id);
            if (car == null)
            {
                return NotFound(new ApiResponse(404));
            }

            mapper.Map(carDto, car);

            // Save the changes to the repository
            unitOfWork.Repository<Car>().Update(car);
            await this.unitOfWork.Complete();

            // Return the updated car
            return car;
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteCar(int id)
        {
            // Get the car from the repository
            var car = await this.unitOfWork.Repository<Car>().GetByIdAsync(id);
            if (car == null)
            {
                return NotFound(new ApiResponse(404));
            }

            // Delete the car from the repository
            this.unitOfWork.Repository<Car>().Delete(car);
            await this.unitOfWork.Complete();

            // Return a success response
            return NoContent();
        }


    }
}