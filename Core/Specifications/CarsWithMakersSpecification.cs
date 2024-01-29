using System.Linq.Expressions;
using Core.Entities;

namespace Core.Specifications
{
    public class CarsWithMakersSpecification : BaseSpecification<Car>
    {
        public CarsWithMakersSpecification(CarSpecParams carParams)
        : base(x =>
        (string.IsNullOrEmpty(carParams.Search) || x.Name.ToLower().Contains(carParams.Search)||
         x.Model.ToString().Contains(carParams.Search)) &&
        (!carParams.MakerId.HasValue || x.CarMakerId == carParams.MakerId))
        {
            AddInclude(x => x.CarMaker);
            AddOrderBy(x => x.Name);
            ApplyPaging(carParams.PageSize * (carParams.PageIndex - 1), carParams.PageSize);

            if (!string.IsNullOrEmpty(carParams.Sort))
            {
                switch (carParams.Sort)
                {
                    case "priceAsc":
                        AddOrderBy(p => p.RentalPrice);
                        break;
                    case "priceDesc":
                        AddOrderByDescending(p => p.RentalPrice);
                        break;
                    default:
                        AddOrderBy(n => n.Name);
                        break;
                }
            }
        }

        public CarsWithMakersSpecification(int id) : base(x => x.Id == id)
        {
            AddInclude(x => x.CarMaker);
        }
    }
}