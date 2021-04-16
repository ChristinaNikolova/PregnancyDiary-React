namespace PregnancyDiary.Services.Data.Users
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;

    using Microsoft.EntityFrameworkCore;
    using PregnancyDiary.Data.Common.Repositories;
    using PregnancyDiary.Data.Models;
    using PregnancyDiary.Services.Mapping;

    public class UsersService : IUsersService
    {
        private readonly IRepository<UserArticleLike> userArticleLikes;

        public UsersService(IRepository<UserArticleLike> userArticleLikes)
        {
            this.userArticleLikes = userArticleLikes;
        }

        public async Task<IEnumerable<T>> GetFavouriteArticlesAsync<T>(string userId)
        {
            var favArticles = await this.userArticleLikes
                .All()
                .Where(ual => ual.UserId == userId)
                .OrderByDescending(ual => ual.Article.CreatedOn)
                .ThenBy(ual => ual.Article.Title)
                .To<T>()
                .ToListAsync();

            return favArticles;
        }
    }
}
