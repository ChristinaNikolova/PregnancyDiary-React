namespace PregnancyDiary.Services.Data.Comments
{
    using System.Collections.Generic;
    using System.Threading.Tasks;

    public interface ICommentsService
    {
        Task<IEnumerable<T>> GetAllCurrentRecipeAsync<T>(string articleId);
    }
}
