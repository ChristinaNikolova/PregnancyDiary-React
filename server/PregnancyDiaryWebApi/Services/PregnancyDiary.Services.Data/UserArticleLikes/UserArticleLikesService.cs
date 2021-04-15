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

        public async Task DislikeAsync(string userId, string articleId)
        {
            var userArticleLike = await this.userArticlesLikesRepository
                .All()
                .FirstOrDefaultAsync(ual => ual.ArticleId == articleId && ual.UserId == userId);

            this.userArticlesLikesRepository.Delete(userArticleLike);
            await this.userArticlesLikesRepository.SaveChangesAsync();
        }

        public async Task<bool> IsFavouriteAsync(string userId, string articleId)
        {
            var isFavourite = await this.userArticlesLikesRepository
                .All()
                .AnyAsync(ual => ual.UserId == userId && ual.ArticleId == articleId);

            return isFavourite;
        }

        public async Task LikeAsync(string userId, string articleId)
        {
            var userArticleLike = new UserArticleLike()
            {
                ArticleId = articleId,
                UserId = userId,
            };

            await this.userArticlesLikesRepository.AddAsync(userArticleLike);
            await this.userArticlesLikesRepository.SaveChangesAsync();
        }
    }
}
