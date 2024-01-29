using Core.Entities.Identity;
using Microsoft.AspNetCore.Identity;

namespace Infrastructure.Identity
{
    public class AppIdentityDbContextSeed
    {
        public static async Task SeedUsersAsync(UserManager<AppUser> userManager)
        {
            if (!userManager.Users.Any())
            {
                var users = new List<(string UserName, string Email, bool IsAdmin, string Password)>
                {
                    ("admin@gmail.com","admin@gmail.com", true, "admin@2000"),
                    ("test@gmail.com","test@gmail.com", false, "test@2000"),
                };

                foreach (var userData in users)
                {
                    var user = new AppUser
                    {
                        UserName = userData.UserName,
                        Email = userData.Email,
                        IsAdmin = userData.IsAdmin
                    };

                   var result = await userManager.CreateAsync(user, userData.Password);
                    if (!result.Succeeded)
                    {
                        foreach (var error in result.Errors)
                        {
                            Console.WriteLine($"Error: {error.Description}");
                        }
                    }
                }
            }
        }
    }
}
