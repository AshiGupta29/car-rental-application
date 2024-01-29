using Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Data.Config
{
    public class CarConfiguration : IEntityTypeConfiguration<Car>
    {
        public void Configure(EntityTypeBuilder<Car> builder)
        {
            builder.Property(p => p.Name).IsRequired().HasMaxLength(100);
            builder.Property(p => p.Model).IsRequired();
            builder.Property(p => p.ImageUrl).IsRequired();
            builder.Property(p => p.RentalPrice).IsRequired().HasColumnType("decimal(18,2)");
            builder.Property(p => p.AvailabilityStatus).IsRequired();
            builder.HasOne(p => p.CarMaker).WithMany().HasForeignKey(p => p.CarMakerId);
            
        }
    }
}