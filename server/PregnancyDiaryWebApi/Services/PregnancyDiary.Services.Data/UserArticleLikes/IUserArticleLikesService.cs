namespace PregnancyDiary.Services.Data.ArticleLikes
{
    using System.Threading.Tasks;

    public interface IUserArticleLikesService
    {
        Task<bool> IsFavouriteAsync(string userId, string articleId);
    }
}
