namespace PregnancyDiary.Services.Data.Articles
{
    using System.Collections.Generic;
    using System.Threading.Tasks;

    public interface IArticlesService
    {
        Task<IEnumerable<T>> GetAllAsync<T>();

        Task<IEnumerable<T>> GetAllCurrentCategoryAsync<T>(string categoryId);

        Task<IEnumerable<T>> GetSearchedAsync<T>(string query);
    }
}
