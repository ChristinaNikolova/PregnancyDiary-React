﻿namespace PregnancyDiary.Data.Seeding.CustomSeeder
{
    using System;
    using System.Linq;
    using System.Threading.Tasks;

    using Microsoft.AspNetCore.Identity;
    using Microsoft.Extensions.DependencyInjection;
    using PregnancyDiary.Common;
    using PregnancyDiary.Data.Models;

    public class UsersToRolesSeeder : ISeeder
    {
        public async Task SeedAsync(ApplicationDbContext dbContext, IServiceProvider serviceProvider)
        {
            var userManager = serviceProvider.GetRequiredService<UserManager<ApplicationUser>>();

            await SeedRoleAsync(userManager, GlobalConstants.Roles.Admin, GlobalConstants.Admin.Email);
        }

        private static async Task SeedRoleAsync(UserManager<ApplicationUser> userManager, string roleName, string userEmail)
        {
            var users = userManager.Users
                .Where(u => u.Email.Contains(userEmail))
                .ToList();

            foreach (var user in users)
            {
                if (user.Roles.Any() == false)
                {
                    await userManager.AddToRoleAsync(user, roleName);
                }
            }
        }
    }
}
