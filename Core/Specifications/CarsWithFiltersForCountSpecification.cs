// using Core.Entities;

// namespace Core.Specifications
// {
//     public class CarsWithFiltersForCountSpecification : BaseSpecification<Car>
//     {
//         public CarsWithFiltersForCountSpecification(CarSpecParams carParams)
//          : base(x =>
//          (string.IsNullOrEmpty(carParams.Search) || x.Name.ToLower().Contains(carParams.Search)) &&
//          (!carParams.MakerId.HasValue || x.CarMakerId == carParams.MakerId))
//         {

//         }
//     }
// }

using Core.Entities;

namespace Core.Specifications
{
    public class CarsWithFiltersForCountSpecification : BaseSpecification<Car>
    {
        public CarsWithFiltersForCountSpecification(CarSpecParams carParams)
            : base(x =>
                (string.IsNullOrEmpty(carParams.Search) ||
                 x.Name.ToLower().Contains(carParams.Search) ||
                 x.Model.ToString().Contains(carParams.Search)) && // Check for name or model
                (!carParams.MakerId.HasValue || x.CarMakerId == carParams.MakerId))
        {
        }
    }
}
