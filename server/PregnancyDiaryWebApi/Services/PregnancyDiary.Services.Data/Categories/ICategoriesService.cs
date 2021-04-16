namespace PregnancyDiary.Services.Data.Categories
{
    using System.Collections.Generic;
    using System.Threading.Tasks;

    public interface ICategoriesService
    {
        Task<IEnumerable<T>> GetArticlesCountByCategoriesAsync<T>();

        Task<string> GetNameByIdAsync(string categoryId);

        Task<IEnumerable<T>> GetAllForAdminAsync<T>();

        Task DeleteAsync(string id);
    }
}
