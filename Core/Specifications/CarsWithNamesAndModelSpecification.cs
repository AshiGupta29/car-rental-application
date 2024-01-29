using Core.Entities;
using Core.Specifications;
using System.Linq.Expressions;

namespace Infrastructure.Data.Specifications
{
    public class CarsWithNamesAndModelSpecification : BaseSpecification<Car>
    {
        public CarsWithNamesAndModelSpecification(IEnumerable<int> carIds)
            : base(BuildSpecificationExpression(carIds))
        {
        }

        private static Expression<Func<Car, bool>> BuildSpecificationExpression(IEnumerable<int> carIds)
        {
            return p => carIds.Contains(p.Id);
        }
    }
}
