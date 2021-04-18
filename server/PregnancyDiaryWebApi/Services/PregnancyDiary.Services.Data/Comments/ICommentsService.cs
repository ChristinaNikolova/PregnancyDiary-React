namespace PregnancyDiary.Services.Data.Comments
{
    using System.Collections.Generic;
    using System.Threading.Tasks;

    public interface ICommentsService
    {
        Task<IEnumerable<T>> GetAllCurrentArticleAsync<T>(string articleId);

        Task CreateAsync(string content, string articleId, string userId);
    }
}
