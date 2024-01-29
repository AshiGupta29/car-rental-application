using System.Text.Json;
using Core.Entities;

namespace Infrastructure.Data
{
    public class StoreContextSeed
    {
        public static async Task SeedAsync(StoreContext context)
        {
            if (!context.CarMakers.Any())
            {
                var makersData = File.ReadAllText("../Infrastructure/Data/SeedData/Makers.json");
                var makers = JsonSerializer.Deserialize<List<CarMaker>>(makersData);
                context.CarMakers.AddRange(makers);
            }
            if (!context.Cars.Any())
            {
                var carData = File.ReadAllText("../Infrastructure/Data/SeedData/Cars.json");
                var cars = JsonSerializer.Deserialize<List<Car>>(carData);
                context.Cars.AddRange(cars);
            }


            if (context.ChangeTracker.HasChanges()) await context.SaveChangesAsync();
        }
    }

}