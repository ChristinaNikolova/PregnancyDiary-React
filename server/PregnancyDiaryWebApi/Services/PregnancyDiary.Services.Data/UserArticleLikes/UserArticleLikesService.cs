namespace PregnancyDiary.Services.Data.ArticleLikes
{
    using System.Threading.Tasks;

    using Microsoft.EntityFrameworkCore;
    using PregnancyDiary.Data.Common.Repositories;
    using PregnancyDiary.Data.Models;

    public class UserArticleLikesService : IUserArticleLikesService
    {
        private readonly IRepository<UserArticleLike> userArticlesLikesRepository;

        public UserArticleLikesService(IRepository<UserArticleLike> userArticlesLikesRepository)
        {
            this.userArticlesLikesRepository = userArticlesLikesRepository;
        }

        public async Task<bool> IsFavouriteAsync(string userId, string articleId)
        {
            var isFavourite = await this.userArticlesLikesRepository
                .All()
                .AnyAsync(ual => ual.UserId == userId && ual.ArticleId == articleId);

            return isFavourite;
        }
    }
}
